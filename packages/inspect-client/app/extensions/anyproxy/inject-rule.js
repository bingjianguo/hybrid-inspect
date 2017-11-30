const cheerio = require('cheerio');
const { decode, encode } = require('iconv-lite');
const { detect } = require('jschardet');
const URL = require('url');
const request = require('request');


const RESTYPE = {
  json: 'json',
  html: 'html',
  image: 'image'
};
/**
 * 获得http(s)请求返回类型
 * @param response
 * @returns {string}
 */
const getResType = (response) => {
  const contentType = response.header['Content-Type'] || '';
  let resType = '';
  if ( contentType.indexOf('html') >= 0 ) {
    resType = RESTYPE.html;
  } else if (contentType.indexOf('json') >= 0) {
    resType = RESTYPE.json;
  }
  // else if ( contentType.indexOf('image') >= 0) {
  //   resType = RESTYPE.image;
  // }

  return resType;
};

/**
 * 注入vorlon的js文件
 * @param body
 * @returns {*}
 */
function *injectDebugJs( { body, url } ) {
  const detectResult =  detect(body) ;
  let content;
  const { encoding } = detectResult;
  let pureUrl = url;
  if ( url.indexOf('?') > 0 || url.indexOf('#')) {
    pureUrl = url.split(/[#?]/)[0];


  }

  // 编码方式不定的页面不加入debug view
  if ( !encoding ) {
    console.log(`[inject] can not encoding`);
    return body;
  }
  const lowerCaseEncoding = encoding.toLowerCase();
  if ( lowerCaseEncoding == 'gbk' || lowerCaseEncoding == 'gb2312' ) {
    content = decode(body, lowerCaseEncoding);
  } else {
    content = decode(body, 'utf8');
  }
  const $ = cheerio.load(content);
  const ip = process.env.IPADDRESS || '127.0.0.1';
  let title = $('title').html();
  title = encode(title,lowerCaseEncoding);

  $('head').prepend(`
    <script>window.vorlonTitle=unescape("${title}".replace(/&#x/g,'%u').replace(/;/g,''));</script>
    <script src="https://${ip}:5680/vorlon.js" ></script>
  `);

  // 注释掉css替换
  // $('link').each((index, link) => {
  //   let originHref = $(link).attr('href');
  //   if ( originHref[0] == '.' || originHref[0] == '/') {
  //     originHref = URL.resolve(pureUrl, originHref);
  //   }
  //
  //   const newHref = '/proxyToLocal?url=' + encodeURIComponent(originHref);
  //   $(link).attr('href', newHref);
  // });

  const retHtml = $.html();

  const encodingRetHtml = encode(retHtml, lowerCaseEncoding);
  console.log(`[inject] success`);
  return encodingRetHtml;
}

module.exports = {
  summary: 'inject rule',
  *beforeDealHttpsRequest(requestDetail) {
    const { host } = requestDetail;
    const { IPADDRESS } = process.env;

    // 本身启动服务的同一个IP地址
    if ( host.indexOf(IPADDRESS) >= 0 )
      return false;
    // 只对html进行编解码处理，不需要

    return true;
  },


  *beforeSendRequest(requestDetail) {
    const { requestOptions } = requestDetail;
    const { headers } = requestOptions;
    headers['Cache-Control'] = 'no-cache';
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Credentials'] = true;
    const targetReg = (/\/proxyToLocal/);
    const urlReg = /^[http]/i;
    const { url } = requestDetail;
    const { Accept } = headers;


    if ( targetReg.test(url) ) {
      // 加过重定向到本地服务
      const urlObj = URL.parse(url, true);
      const { query } = urlObj;
      const originUrl = decodeURIComponent(query.url);
      const originUrlObj = URL.parse(originUrl, true);
      requestOptions.protocol = originUrlObj.protocol;
      requestOptions.host = originUrlObj.host;
      requestOptions.hostname = originUrlObj.hostname;
      requestOptions.path = originUrlObj.path;
      requestOptions.port = originUrlObj.port;
      requestOptions.pathname = originUrlObj.pathname;
      headers['Host'] = originUrlObj.host;
      return {
        protocol: originUrlObj.protocol,
        requestOptions
      }
    } else if ( Accept && Accept.indexOf('image') >= 0 && urlReg.test(url)) {

      // 没有加过重定向到本地服务
      console.log('----------302--------------');
      return {
        response: {
          statusCode: 302,
          header: {
            'Location': `/proxyToLocal?url=${encodeURIComponent(url)}`
          }
        }
      }
    }

    // if ( Accept && Accept.indexOf('image') >= 0  ) {
    //   console.log(`Accept =${Accept} ------------------${url}`);
    //
    //   if ( !targetReg.test(url) ) {
    //     // 没有加过重定向到本地服务
    //     return {
    //       response: {
    //         statusCode: 302,
    //         header: {
    //           'Location': `/proxyToLocal?url=${encodeURIComponent(url)}`
    //         }
    //       }
    //     }
    //   }
    // } else if ( targetReg.test(url) ) {
    //   const urlObj = URL.parse(url, true);
    //   const { query } = urlObj;
    //   const originUrl = decodeURIComponent(query.url);
    //   const originUrlObj = URL.parse(originUrl, true);
    //   requestOptions.protocol = originUrlObj.protocol;
    //   requestOptions.host = originUrlObj.host;
    //   requestOptions.hostname = originUrlObj.hostname;
    //   requestOptions.path = originUrlObj.path;
    //   requestOptions.pathname = originUrlObj.pathname;
    //
    //   const cssContent = yield new Promise((resolve) => {
    //     request({
    //       url: originUrl
    //     }, (error, response, body) => {
    //       resolve(body);
    //     });
    //   });
    //
    //   return {
    //     response: {
    //       statusCode: 200,
    //       header: { 'content-type': 'text/css' },
    //       body: cssContent
    //     }
    //   }
    // }

    return {
      requestOptions
    };
  },
  /**
   * 总入口
   * @param requestDetail
   * @param responseDetail
   */
  *beforeSendResponse(requestDetail, responseDetail) {
    const { response } = responseDetail;
    const resType = getResType(response);

    const { url, _req: req } = requestDetail;
    const referer = req.headers['Referer'];

    if ( resType == RESTYPE.html ) {

      if (true || !referer) {
        console.log(`[inject] url=${url} refer=${referer}`);
        let { body } = response;
        body = yield injectDebugJs({ body, url });
        response.body = body;
      }
    }
    // 禁止浏览器缓存，对于服务端返回cache-control情况
    const { header } = response;
    header['Cache-Control'] = 'no-cache';
    header['Access-Control-Allow-Origin'] = '*';
    header['Access-Control-Allow-Credentials'] = true;

    return new Promise((resolve) => {
      resolve(responseDetail);
    });
  }
};
