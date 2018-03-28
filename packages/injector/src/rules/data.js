const fse = require('fs-extra');
const util = require('util');
const { detect } = require('jschardet');
const { decode } = require('iconv-lite');
const path = require('path');
const homedir = require('homedir');
const request = require('request');
const { decodeBuffer, getParameterHash, getPureUrl, getPathname, getResponseType, getRequestObject } = require('./common');

const { outputFileSync, existsSync, readFileSync } = fse;
const { requestdb: db, getRequestSchema } = require('../util/db');

const { anyproxyConfig } = require('../util/constant');

exports.saveResponseToDbAsync = function saveResponseToDbAsync(responseDetail, requestDetail) {
  let { response } = responseDetail;
  const { statusCode } = response;
  const { url, _req: req } = requestDetail;
  let { 'Content-Type': contentType } = response.header;
  
  // 数据接口情况
  if ( statusCode === 200 ) {
     // 保存到数据库中
     const binaryBody = decodeBuffer(response.body);
     const phash = getParameterHash(requestDetail);
     const referer = req.headers['Referer'];
     const pureUrl = getPureUrl(url);
     const query = { pureUrl }; // 去掉phash, 只关注url链接请求
     const timestamp = +(new Date());
     const schema = getRequestSchema();
     const responseType = getResponseType(response);
     const requestObject = getRequestObject(requestDetail);
     const record = Object.assign({}, schema, { 
       url,
       responseType,
       pureUrl,
       referer,
       phash,
       body: binaryBody,
       parameters: requestObject,
       timestamp
      });
      
     db.loadDatabase((err) => {
       console.log('in load Database');
       if (err) {
         console.log(err);
         return;
       }
       db.update(query, record, { upsert: true }, (err, numAffected, affectedDocuments, upsert) => {
         console.log('in db update ' + util.inspect(affectedDocuments) );
         console.log(err);
       });
     });
  }
}

exports.saveJsonResponse = function saveJsonResponse(file, responseDetail, requestDetail) {

  let { response } = responseDetail;
  const { statusCode } = response;
  const { url, _req: req } = requestDetail;
  // 数据接口情况
  if ( statusCode === 200 ) {

    outputFileSync(file, response.body);
   
  } else {
    // 接口挂了的情况，一般很少见
    const bExist = existsSync(file);
    if ( bExist ) {
      let body = readFileSync(file);
      const statusCode = 200;
      const { encoding } =  detect(body);
      if ( encoding.toLowerCase() == 'gbk' || encoding.toLowerCase() == 'gb2312' ) {
        body = decode(body, 'gbk');
      }

      Object.assign(response, {
        body,
        statusCode
      });

    }
  }

  return { response };
}

/**
 * 
 * @param {*} responseDetail 
 * @param {*} requestDetail 
 */
exports.saveResponseToRemoteService = function saveResponseToRemoteService(responseDetail, requestDetail) {

  let { response } = responseDetail;
  const { statusCode } = response;
  const { url, _req: req } = requestDetail;
  let { 'Content-Type': contentType } = response.header;
  
  // 数据接口情况
  if ( statusCode === 200 ) {
    // 保存到数据库中
    const body = decodeBuffer(response.body);
    const referer = req.headers['Referer'];
    const pureUrl = getPureUrl(url);
    const pathname = getPathname(url);
    const timestamp = +(new Date());    
    const responseType = getResponseType(response);
    const parameters = getRequestObject(requestDetail);
    const { mock: { serverAddress, scene = '', projects = [] } } = anyproxyConfig;
    let pid = '';

    if (projects.length > 0) {
      pid = projects[0].id;
      const filterProjects = projects.filter((item) => {
        const { urls } = item;
        const filterUrls = urls.filter((urlItem) => {
          return pureUrl.indexOf(urlItem) >= 0;
        });
        return filterUrls.length > 0;
      });

      if (filterProjects.length > 0) {
        pid = filterProjects[0].id;
      } 
    }
    const serviceUrl = `${serverAddress}/mock/external/record`;
    request({
      url: serviceUrl,
      method: 'POST',
      encoding: null,
      rejectUnauthorized: false,
      json: true,
      body: {
        ajaxData: {
          pid,
          name: pathname,
          body,
          timestamp,
          responseType,
          referer,
          parameters,
          from: 'import'
        }
      },
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    },(err, res, ret) => {
      if (err) {
        console.log('error!' + JSON.stringify(err));
        return;
      }
      console.log('success!' + JSON.stringify(ret));
    });
  }
}