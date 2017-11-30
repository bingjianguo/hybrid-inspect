/*
 read the following wiki before using rule file
 https://github.com/alibaba/anyproxy/wiki/What-is-rule-file-and-how-to-write-one
 */
import fse, { ensureDir } from 'fs-extra';
import path from 'path';
import { getCacheInfo, loadResponseFromCache, isUseCacheFirst, RESTYPE, isUserSetCache } from './rules/cache';
import { genereteHtmlResponse, appendDebugView } from './rules/html';
import { genereteJsonResponse } from './rules/data';
import { isInteresting, saveConfig } from './rules/cache';
import { isAssetInteresting, getAssetRequest } from "./rules/assets";
import util from 'util';
const cwd = process.cwd();
const rootPath = path.resolve(cwd, '.proxy');
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

    if ( isInteresting(url) ) {
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
          return new Promise((resolve) => {
            resolve({
              ...responseDetail,
              response
            });
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
        const { response } = genereteJsonResponse(file, responseDetail, requestDetail);
        responseDetail.response = response;
      }
    }
    return new Promise((resolve) => {
      resolve(responseDetail);
    });
  }
};

