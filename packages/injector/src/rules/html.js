const { outputFileSync, existsSync, readFileSync } = require('fs-extra');
const cheerio = require('cheerio');
const { decode, encode } = require('iconv-lite');
const { detect } = require('jschardet');
const ipUtil = require('ip') ;

exports.appendDebugView = function *appendDebugView( body ) {
  const detectResult =  detect(body) ;
  let content;
  const { encoding } = detectResult;
  
  // 编码方式不定的页面不加入debug view
  if ( !encoding ) {
    return body;
  }
  const lowerCaseEncoding = encoding.toLowerCase();
  if ( lowerCaseEncoding == 'gbk' ) {
    content = decode(body, 'gbk');
  } else if ( lowerCaseEncoding == 'gb2312' ) {
    content = decode(body, 'gb2312');
  } else {
    content = decode(body, 'utf8');
  }

  const $ = cheerio.load(content);
  // const ip = 'http://127.0.0.1:7001';
  // const entranceCss = yield new Promise((resolve) => {
  //   request({
  //     url: `${ip}/public/entrance.css`
  //   }, (error, response, body) => {
  //     resolve(body);
  //   });
  // });
  // 
  // <link href="${ip}/public/entrance.css" rel="stylesheet" />
  // ip.address()仅适用于同机部署proxy和service的情况
  // console.log(util.inspect(ipUtil, { depth: 1}))
  // <style>${entranceCss}</style>
  // <link href="/agentBackend/public/entrance.css" rel="stylesheet" />
  $('head').prepend(`
    <script type="text/javascript">window.serviceIp='${ipUtil.address()}'</script>
    <style>
      #anyprox-debug {
        position: fixed;
        bottom: 20px;
        right: 20px;
      }
      #anyprox-debug .anyproxy-container {
        width: 50px;
        height: 50px;
        cursor: pointer;
      }
      #anyprox-debug .anyproxy-container img {
        width: 100%;
        height: auto;
      }
    </style>
    <script>
      window.dynamicLoading = {
        css: function(path){
          if(!path || path.length === 0){
            throw new Error('argument "path" is required !');
          }
          var head = document.getElementsByTagName('head')[0];
          var link = document.createElement('link');
          link.href = path;
          link.rel = 'stylesheet';
          link.type = 'text/css';
          head.appendChild(link);
        },
        js: function(path){
          if(!path || path.length === 0){
            throw new Error('argument "path" is required !');
          }
          var head = document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          script.src = path;
          script.type = 'text/javascript';
          head.appendChild(script);
        }
      };
    </script>
    <script src="//as.alipayobjects.com/g/component/react/15.5.4/react.js" ></script>
    <script src="//as.alipayobjects.com/g/component/react/15.5.4/react-dom.js"></script>
  `);
  

  // const commonJs = yield new Promise((resolve) => {
  //   request({
  //     url: `${ip}/public/common.js`
  //   }, (error, response, body) => {
  //     resolve(body);
  //   });
  // });

  // const entranceJs = yield new Promise((resolve) => {
  //   request({
  //     url: `${ip}/public/entrance.js`
  //   }, (error, response, body) => {
  //     resolve(body);
  //   });
  // });
 
  // <script type="text/javascript">${commonJs}</script>
  // <script type="text/javascript">${entranceJs}</script>  
  // <script src="${ip}/public/common.js" ></script>
  // <script src="${ip}/public/entrance.js" ></script>
  $('body').append(`
    <div id="anyprox-debug"></div>
    <script src="/agentBackend/public/sdk/common.js" ></script>
    <script src="/agentBackend/public/sdk/entrance.js" ></script>
  `);

  
  const retHtml = $.html();

  const encodingRetHtml = encode(retHtml, lowerCaseEncoding);
  return encodingRetHtml;
}

exports.genereteHtmlResponse = function genereteHtmlResponse(file, responseDetail) {
  let { response } = responseDetail;
  const { statusCode } = response;
  const { body } = response;
  // 主文档情况

  if ( statusCode === 200 ) {
    const detectResult =  detect(body);
    const { encoding } = detectResult;
    const lowerCaseEncoding = encoding.toLowerCase();
    if ( encoding ) {
      let content;
      if ( lowerCaseEncoding == 'gbk' ) {
        content = decode(body, 'gbk');
      } else if (lowerCaseEncoding == 'gb2312' ) {
        content = decode(body, 'gb2312');
        // content = body;
      } else {
        content = decode(body, 'utf8');
      }

      const $ = cheerio.load(content);

      outputFileSync(file, $.html());
    } else {
      //
    }

  } else {

    const bExist = existsSync(file);
    // 服务器挂的情况，是一个302
    if ( bExist ) {
      console.log(`read ${file} from local disk`);
      // response.body = iconv.decode(fse.readFileSync(file), 'utf8');
      const body = readFileSync(file);
      const statusCode = 200;
      Object.assign(response, {
        body,
        statusCode
      });
    }
  }

  return { response };
}