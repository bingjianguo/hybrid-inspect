// import { isAssetInteresting, getAssetRequest } from "./rules/assets";
// import ip from 'ip';
// import { parse } from 'querystring';
// import URL from 'url';
const path = require('path');
const { isAssetInteresting, getAssetRequest } = require('./rules/assets');
const ip = require('ip');
const { parse } = require('querystring');
const URL = require('url');
const fs = require('fs');

const { anyproxyConfig } =  require('./util/constant');

module.exports = {
  summary: 'assets rule',
  *beforeSendRequest(requestDetail) {
    try {
      if (!anyproxyConfig) {
        console.log('no anyproxy config');
        // console.log(sourceRegString);
        // console.log(`${url} | ${targetReg.test(url)}`);
        return null;
      }

      const { assets } = anyproxyConfig;
      if (assets && !assets.enable)
        return null;

      const { sourceRegString, destUrlPath } = assets;
      const { url, _req: req } = requestDetail;
      
      const targetReg = new RegExp(sourceRegString);   
      
      if ( isAssetInteresting({ url, targetReg }) ) {
        // 之前的匹配逻辑
        // let ipAddress = ip.address();
        // const referer = req.headers['Referer'];
        // if ( referer ) {
        //   const { query: { asip } } = URL.parse(referer, true);
        //   if ( asip ) {
        //     ipAddress = asip;
        //     console.log(`asip = ${asip}`);
        //   }
        // }
  
        const urlObj = URL.parse(destUrlPath, true);
        
        const ret = getAssetRequest({ 
          requestDetail, 
          targetReg 
        }, urlObj);
  
        if (targetReg.test(url)) {
          console.log(ret);
        }
        return ret;
      }
    } catch (err) {
      console.log(err)
    }
    

  }
};