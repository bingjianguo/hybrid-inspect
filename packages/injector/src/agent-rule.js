
/*
 read the following wiki before using rule file
 https://github.com/alibaba/anyproxy/wiki/What-is-rule-file-and-how-to-write-one
 */
const fse = require('fs-extra');
const { ensureDir }= fse;
const path = require('path');
const homedir = require('homedir');
const URL = require('url');
const { parse } = require('querystring');

const {
  getCacheInfo,
  loadResponseFromDbAsync,
  loadResponseFromRemoteService,
  isUseCacheFirst,
  RESTYPE,
  isUserSetCache,
  isInteresting,
  saveConfig
} = require('./rules/cache');
const { genereteHtmlResponse, appendDebugView } = require('./rules/html');
const { loadResponseFromDb } = require('./rules/cache');
const { 
  saveJsonResponse,
  saveResponseToDbAsync,
  saveResponseToRemoteService,
} = require('./rules/data');
const rootPath = path.join(homedir(), '.anyproxy', '.proxy');
ensureDir(rootPath);

module.exports = {
  summary: 'agent rule',
  /**
   *
   * @param requestDetail
   * @param responseDetail
   */
  *beforeSendResponse(requestDetail, responseDetail) {
    const { url } = requestDetail;
    const { response } = responseDetail;
    const contentType = response.header['Content-Type'];
    const { anyproxyConfig } =  require('./util/constant');
    if (!anyproxyConfig) {
      console.log('no anyproxy config');
      return null;
    }

    const { mock } = anyproxyConfig;
    if (mock && !mock.enable)
      return null;
    // 
    if (isInteresting(url, contentType)) {
      const bEnableDb = false;
      const bEnableRemoteService = true;
      const bEnableFile = false;
   
      if ( bEnableRemoteService ) {
        const { requestData } = requestDetail;
        const { query } = URL.parse(url, true);
        let parameters = {};
        parameters = parse(requestData.toString());
        parameters = Object.assign({}, parameters, query);
        return new Promise((resolve) => {
          loadResponseFromRemoteService({ url, parameters }, responseDetail.response).then((response) => {

            if (!response) {
              // 如果后台系统中没有该请求的访问记录，那么将线上数据保存到服务端
              // 有bug，暂时注释掉
              // saveResponseToRemoteService(responseDetail, requestDetail);
              resolve(responseDetail);
            } else {
              const result = Object.assign({}, responseDetail, { response });
              resolve(result);
            }
            
          });
        });
      } else if ( bEnableDb ) {
        return new Promise((resolve) => {
          loadResponseFromDbAsync(url, responseDetail.response).then((response) => {
            if (!response) {
              saveResponseToDbAsync(responseDetail, requestDetail);
              return resolve(null);
            }
            const result = Object.assign({}, responseDetail, { response });
            resolve(result);
          });
        });
      } else if ( bEnableFile ) {
        const cacheInfo = getCacheInfo(rootPath, requestDetail, responseDetail);
        if ( !cacheInfo ) {
          return null;
        }
  
        const {
          file,
          exist,
          resType,
          dir,
          fileName
        } = cacheInfo;
  
        if ( exist ) {
          const useCacheFirst = isUseCacheFirst(url, responseDetail);
          const userSetCache = isUserSetCache(dir, fileName, requestDetail);
          if ( useCacheFirst || userSetCache) {
            const response = loadResponseFromCache(file, responseDetail.response);
            if ( resType == RESTYPE.html ) {
              let { body } = response;
              body = yield appendDebugView(body);
              response.body = body;
            }
            const result = Object.assign({}, responseDetail, { response });
            return new Promise((resolve) => {
              resolve(result);
            });
          }
        }
  
        saveConfig({ rootPath, resType }, requestDetail);
  
        if ( resType == RESTYPE.html ) {
          const { response } = genereteHtmlResponse(file, responseDetail);
          let { body } = response;
          body = yield appendDebugView(body);
          response.body = body;
          responseDetail.response = response;
        } else {
          const { response } = saveJsonResponse(file, responseDetail, requestDetail);
          responseDetail.response = response;
        }
      }
    }
    


    return new Promise((resolve) => {
      resolve(responseDetail);
    });
  }
};

