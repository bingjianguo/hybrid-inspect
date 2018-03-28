const cheerio = require('cheerio');
const { decode, encode } = require('iconv-lite');
const { detect } = require('jschardet');
const { parse } = require('querystring');
const crypto = require('crypto');
const URL = require('url');

const RESTYPE = {
  json: 'json',
  html: 'html'
};

exports.RESTYPE = RESTYPE;

exports.getResponseType = (response) => {
  const contentType = response.header['Content-Type'] || '';
  let resType = '';
  if ( contentType.indexOf('html') >= 0 ) {
    resType = RESTYPE.html;
  } else if (contentType.indexOf('json')) {
    resType = RESTYPE.json;
  }

  return resType;
};

exports.loadCheerio = function * ( body ) {
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
  const ret = {
    $: cheerio.load(content),
    encoding: lowerCaseEncoding
  };
  return ret;
};


exports.loadHtml = ($, encoding) => {
  const retHtml = $.html();
  const encodingRetHtml = encode(retHtml, encoding);
  return encodingRetHtml;
};

exports.decodeBuffer = ( buffer ) => {
  const detectResult =  detect(buffer) ;
  let content;
  const { encoding } = detectResult;

  // 编码方式不定的页面不加入debug view
  if ( !encoding ) {
    return buffer.toString('binary');
  }
  const lowerCaseEncoding = encoding.toLowerCase();
  if ( lowerCaseEncoding == 'gbk' ) {
    content = decode(buffer, 'gbk');
  } else if ( lowerCaseEncoding == 'gb2312' ) {
    content = decode(buffer, 'gb2312');
  } else {
    content = decode(buffer, 'utf8');
  }

  return content;
};

/**
 * 获取不含query部分的url内容
 * @param url
 * @returns {*}
 */
exports.getPureUrl = (url) => {
  let pureUrl = url;
  if (pureUrl.indexOf('?')>=0) {
    pureUrl = pureUrl.split('?')[0];
  }
  return pureUrl;
}


/**
 *
 * @param requestDetail
 * @returns {string}
 */
exports.getParameterHash = ( requestDetail ) => {
  // 增加以参数作为postfix的内容
  let requestObject = {};
  let postFix = '';
  try {
    const { requestData, url } = requestDetail;
    const { query } = URL.parse(url, true);

    requestObject = parse(requestData.toString());
    requestObject = Object.assign({},requestObject,query);
    const keys = Object.keys(requestObject);

    if ( keys.length > 0 ) {

      const sortedQuery = keys.map((key) => {
        // 去除编码和防刷参数的匹配
        if (
          key == 'ctoken' ||
          key == '_input_charset' ||
          key == '_ts' ||
          key == '_' ||
          key == 't'
        ) {
          return '';
        }
        return `${key}=${requestObject[key]}`;
      });
      postFix = sortedQuery.join('');
      if ( postFix ) {
        const md5 = crypto.createHash('md5');
        postFix = md5.update(postFix).digest('hex');
      }

    }
  } catch( exception ) {

  }

  return postFix;
};


exports.getRequestObject = (requestDetail) => {
  const { requestData, url } = requestDetail;
  const { query } = URL.parse(url, true);
  requestObject = parse(requestData.toString());
  requestObject = Object.assign({},requestObject, query);
  return requestObject;
}

exports.getPathname = (url) => {
  const { pathname } = URL.parse(url, true);
  return pathname;
}