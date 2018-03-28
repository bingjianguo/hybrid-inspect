const fse = require('fs-extra');
const path = require('path');
const { parse } = require('querystring');
const crypto = require('crypto');
const URL = require('url');
const moment = require('moment');
const request = require('request');
const { detect } = require('jschardet');
const { mockdb, requestdb } = require('../util/db');
const { outputFileSync, existsSync, readFileSync, ensureDir, outputJsonSync, readJsonSync } = fse;

const { anyproxyConfig } = require('../util/constant');

const RESTYPE = {
  json: 'json',
  html: 'html'
};

exports.RESTYPE = RESTYPE;
/**
 * 返回response内容
 * @param file
 */
exports.loadResponseFromCache = function loadResponseFromCache( file, response ) {
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

  const result = Object.assign({}, response, {
    body,
    statusCode
  });

  return result;

}

/**
 * 将查询到的mock返回的数据拼装成为response结果
 * @param {*} mock 
 * @param {*} response 
 */
const getResponseByMockData = (mock, response) => {
  const { body } = mock;
  if (!body) {
    return null;
  }
  console.log(mock);

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
  response.header['Content-Mock'] = 'Anymock';
  const result = Object.assign({}, response, {
    body,
    statusCode
  });
  return result;
};

/**
 * 通过nedb获取mock数据
 */
exports.loadResponseFromDbAsync = function loadResponseFromDbAsync(url, response) {
  // 从db中查找对应url的数据
  const pureUrl = getPureUrl(url);

  return new Promise((resolve) => {
    // 查询request数据表
    const interfacePromise = new Promise((interfaceResovle) => {
      requestdb.find({ pureUrl }, function(err, docs ) {
        if (err || !docs || docs.length <= 0 ) {
          resolve(null);
          return;
        }
        const interface = docs[0];
        interfaceResovle(interface);
      });
    });

    interfacePromise.then((targetInterface) => {
      // 查询mock数据表
      const { apiType } = targetInterface;
      if (apiType !== 'mock') {
        resolve(null)
        return;
      }

      const { _id } = targetInterface;
      const mockPromise = new Promise((mockResolve) => {
        mockdb.find({ rid: _id }, function (err, docs) {
          if (err || !docs || docs.length <= 0 ) {
            resolve(null);
            return;
          }
          
          const targetMock = docs[0];
          const ret = Object.assign({}, targetInterface, {
            body: targetMock.body,
            mid: targetMock._id
          });
          mockResolve(ret);
        });
      }); 
      return mockPromise;
    }).then((mockItem) => {

      const { body } = mockItem;
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
      const result = Object.assign({}, response, {
        body,
        statusCode
      });

      

      console.log('fint one target mockItem');
      console.log(`${mockItem._id} ${mockItem.rid} ${pureUrl}`);
      resolve(result);
    });

  });

}

/**
 * 通过服务访问异步接口获取数据
 * @param {*} url 
 * @param {*} response 
 */
exports.loadResponseFromRemoteService = function loadResponseFromRemoteService({ url, parameters }, response) {
  const pureUrl = getPureUrl(url);
  const promise =  new Promise((resolve, reject) => {
    const { mock: { serverAddress, scene = '' } } = anyproxyConfig;
    const serviceUrl = `${serverAddress}/mock/external/query`;
    request({
      url: serviceUrl,
      method: 'POST',
      encoding: null,
      rejectUnauthorized: false,
      json: true,
      timeout: 1000,
      body: {
        ajaxData: {
          url: pureUrl,
          scene,
          parameters
        }

      },
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    },(err, res, ret) => {
      if (err) {
        // reject(err);
        resolve(null);
        return;
      }

      const { success, model } = ret;
      if (success && model ) {
        const result = getResponseByMockData(model, response);
        resolve(result);
      } else {
        resolve(null)
      }
    })
  });

  promise.catch((err) => {
    console.log(err);
  })
  return promise;
}

exports.isInteresting = function isInteresting( url, contentType ) {
  const docAsyncResponse = /(\.htm$)|(\.json$)|(\.html$)/i;
  if ( url.indexOf('userInvocieInfoUpload.htm') >= 0 )
    return false;
  let pureUrl = getPureUrl(url);

  if ( contentType && contentType.indexOf('application/json') >= 0 ) {
    return true;
  }

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
          key == 't' ||
          key == '_ksTS' ||
          key == 'v' ||
          key == '_callback'
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
};

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
exports.saveConfig = function saveConfig( { rootPath, resType }, requestDetail ) {
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


exports.getCacheInfo = function getCacheInfo( rootPath, requestDetail, responseDetail ) {
  const { url, _req: req } = requestDetail;
  const { response } = responseDetail;
  let contentType = response.header['Content-Type'];
  const pureUrl = getPureUrl(url);
  const bJsonRequest = pureUrl.indexOf('.json') >= 0 || (contentType && contentType.indexOf('application/json') >= 0);

  const { statusCode } = response;
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

  const result = Object.assign({}, dirInfo, { exist, file, resType });
  return result;
};


exports.isUseCacheFirst = function isUseCacheFirst( url, responseDetail ) {
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

exports.isUserSetCache = function isUserSetCache(dir, fileName, requestDetail) {
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