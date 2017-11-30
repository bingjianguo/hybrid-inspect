import fse, { outputFileSync, existsSync, readFileSync, ensureDir, outputJsonSync, readJsonSync } from 'fs-extra';
import util from 'util';
import path from 'path';
import { parse } from 'querystring';
import crypto from 'crypto';
import URL from 'url';
import moment from 'moment';
import { detect } from "jschardet";

export const RESTYPE = {
  json: 'json',
  html: 'html'
};
/**
 * 返回response内容
 * @param file
 */
export function loadResponseFromCache( file, response ) {
  const body = readFileSync(file);
  const statusCode = 200;
  let { 'Content-Type': contentType } = response.header;

  if ( contentType.indexOf('javascript')>=0 || contentType.indexOf('json')>=0 ) {
    let { encoding } =  detect(body);
    if ( encoding.toLowerCase() == 'gbk' || encoding.toLowerCase() == 'gb2312' ) {
      contentType = 'application/json;charset=gb2312';
    } else {
      contentType = 'application/json;charset=utf-8';
    }

    response.header['Content-Type'] = contentType;
  } else if (contentType.indexOf('html') >= 0 ) {
    let { encoding } =  detect(body);
    if ( encoding.toLowerCase() == 'gbk' || encoding.toLowerCase() == 'gb2312' ) {
      contentType = 'text/html;charset=gb2312';
    } else {
      contentType = 'text/html;charset=utf-8';
    }
    response.header['Content-Type'] = contentType;
  }

  return {
    ...response,
    body,
    statusCode
  };

}


export function isInteresting( url ) {
  const docAsyncResponse = /(\.htm$)|(\.json$)|(\.html$)/i;

  let pureUrl = getPureUrl(url);

  return docAsyncResponse.test(pureUrl);
}

const saveParameterMap = ( { configFilePath, query, hash, contentType }) => {

  try {
    let config = {
      data: {},
      contentType
    };
    if ( existsSync(configFilePath) ) {
      config = readJsonSync(configFilePath);
    }
    const { data } = config;
    data[hash] = {
      query,
      timeStamp: moment().format('YYYY-MM-DD hh:mm:ss'),
    };
    
    outputJsonSync(configFilePath, config);
  } catch ( exception ) {

  }

};

const getFileName = ( url ) => {
  let pureUrl = getPureUrl(url);
  const pureUrlSplit = pureUrl.split('/');
  const fileName = pureUrlSplit[pureUrlSplit.length-1];
  return fileName;
};

const getParameterHashObject = ( requestDetail ) => {
  // 增加以参数作为postfix的内容
  const { url } = requestDetail;
  let hashFileName = getFileName(url);
  let requestObject = {};
  let postFix = '';
  try {
    const { requestData, url } = requestDetail;
    const { query } = URL.parse(url, true);

    requestObject = parse(requestData.toString());
    requestObject = {
      ...requestObject,
      ...query
    };
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
    if ( postFix ) {
      const fileNameArray = hashFileName.split('.');
      if (fileNameArray.length > 0) {
        const lastIndex = fileNameArray.length - 1;
        const ext = fileNameArray[lastIndex];
        fileNameArray[lastIndex] = `-${postFix}.${ext}`;
        hashFileName = fileNameArray.join('');
      }

    }

  } catch( exception ) {

  }

  return {
    hashFileName,
    requestObject,
    postFix
  };
};

const getResType = (response) => {
  const contentType = response.header['Content-Type'] || '';
  let resType = '';
  if ( contentType.indexOf('html') >= 0 ) {
    resType = RESTYPE.html;
  } else if (contentType.indexOf('json')) {
    resType = RESTYPE.json;
  }

  return resType;
}

/**
 * 获取不含query部分的url内容
 * @param url
 * @returns {*}
 */
const getPureUrl = (url) => {
  let pureUrl = url;
  if (pureUrl.indexOf('?')>=0) {
    pureUrl = pureUrl.split('?')[0];
  }
  return pureUrl;
}

/**
 *
 * @param rootPath
 * @param url
 * @param referer
 * @returns {{pureUrl: *, fileName: *, dir: *}}
 */
const getDirInfo = ( rootPath, url, referer ) => {
  let subDir = rootPath;
  let pureUrl = getPureUrl(url);

  const pureUrlSplit = pureUrl.split('/');
  const fileName = pureUrlSplit[pureUrlSplit.length-1];

  if ( referer ) { // 存在referer时，为数据接口，地址以所在html的路径为根目录

    let pureReferer = referer;
    if (pureReferer.indexOf('?')>=0) {
      pureReferer = pureReferer.split('?')[0];
    }

    if ( pureReferer.indexOf('http://') >= 0) {
      subDir = path.resolve( rootPath, pureReferer.substr(7), fileName);
    } else {
      subDir = path.resolve( rootPath, pureReferer.substr(8), fileName);
    }

  } else {
    if ( pureUrl.indexOf('http://') >= 0) {
      subDir = path.resolve( rootPath, pureUrl.substr(7));
    } else {
      subDir = path.resolve( rootPath, pureUrl.substr(8));
    }
  }

  ensureDir(subDir);

  return {
    pureUrl,
    fileName,
    dir: subDir
  }
};

/**
 * 
 * @param {*} param0 
 * @param {*} requestDetail 
 */
export function saveConfig( { rootPath, resType }, requestDetail ) {
  const { url, _req: req } = requestDetail;
  // console.log(util.inspect(req.headers, {depth: 1, colors: true}));
  
  const contentType = resType;
  let dirInfo = null;
  if ( contentType.indexOf('html') >= 0 ) {
    dirInfo = getDirInfo(rootPath, url);
  } else {
    const referer = req.headers['Referer'];
    dirInfo = getDirInfo(rootPath, url, referer);
  }
  const { dir } = dirInfo;

  // 保存参数到对应的接口配置文件
  const paramHash = getParameterHashObject(requestDetail);
  const {
    requestObject,
    postFix
  } = paramHash;
  const configFilePath = path.resolve(dir, 'config.json');
  saveParameterMap( { configFilePath, query: requestObject, hash: postFix, contentType } );
};


export function getCacheInfo( rootPath, requestDetail, responseDetail ) {
  const { url, _req: req } = requestDetail;
  const { response } = responseDetail;
  const pureUrl = getPureUrl(url);
  const bJsonRequest = pureUrl.indexOf('.json') >= 0;
  const { statusCode } = response;
  let contentType = response.header['Content-Type'];
  let resType;
  // 对于不存在的接口(针对服务端约定之后并没有完成开发的情况)
  // 返回的http response通常为一个重定向的html类型，故强制转为json类型
  if ( statusCode != 200 && bJsonRequest) {
    contentType = 'application/json;charset=utf-8';
    resType = RESTYPE.json;
  } else {
    resType = getResType(response);
  }

  if ( !contentType ) {
    return false;
  }

  let dirInfo = {};
  let hashFileName = '';

  if ( contentType.indexOf('html') >= 0 ) {
    dirInfo = getDirInfo(rootPath, url);
    const { fileName } = dirInfo;
    hashFileName = fileName;
  } else if (
    contentType.indexOf('json') >= 0 ||
    ( contentType.indexOf('javascript') >=0 && bJsonRequest )
  ) {
    const referer = req.headers['Referer'];
    dirInfo = getDirInfo(rootPath, url, referer);
    const paramHash = getParameterHashObject(requestDetail);
    hashFileName = `${paramHash.postFix}.json`;
  }

  const { dir } = dirInfo;
  let file = path.resolve(dir, hashFileName);
  const exist = existsSync(file);

  return {
    ...dirInfo,

    exist,
    file,
    resType
  }
}


export function isUseCacheFirst( url, responseDetail ) {
  const {  _res: { req }, response } = responseDetail;
  const contentType = response.header['Content-Type'];
  if ( contentType.indexOf('html') >= 0 ) {
    const { query: { useCacheFirst } } = URL.parse(url, true);
    if ( useCacheFirst )
      return true;
  } else if (contentType.indexOf('json')) {
    let referer = req.getHeader('referer');
    if (referer) {
      const { query } = URL.parse(referer, true);
      const { useCacheFirst } = query;

      if ( useCacheFirst == 'true' )
        return true;
    }
  }

  return false;
}

export function isUserSetCache(dir, fileName, requestDetail) {
  const configFilePath = path.resolve(dir, 'config.json');
  if ( !existsSync(configFilePath) )
    return false;
  const config = readJsonSync(configFilePath);
  const { data } = config;
  const { postFix } = getParameterHashObject(requestDetail, fileName);
  const configItem =  data[postFix];

  if ( configItem && configItem.enableLocalData ) {
    return true;
  }

  return false;
}