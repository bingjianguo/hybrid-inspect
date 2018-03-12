const { getResponseType, RESTYPE, loadHtml, loadCheerio } = require('./rules/common');
const { outputFileSync, existsSync, readFileSync } = require('fs-extra');
const { decode, encode } = require('iconv-lite');
const util = require('util');

module.exports = {
  summary: 'inlinereplace rule',
  /**
   * 可以用来动态嵌入inline的js脚本文件
   * @param requestDetail
   * @param responseDetail
   * @returns {Promise}
   */
  * beforeSendResponse(requestDetail, responseDetail) {
    const { response } = responseDetail;
    const resType = getResponseType(response);

    if ( resType == RESTYPE.html ) {
      const { body } = response;
      const { $, encoding } = yield loadCheerio(body);
      if ( typeof $ == 'function') {
        const node = $('#unpaidBillScript');

        if ( node.length > 0 ) {
          let content = readFileSync('/Users/guobingjian/workspace/mbillexprod/ANT02453338_20171027_mbillexprod/htdocs/uisvr/enterprise/unpaidBill.js');
          content = decode(content, encoding);
          node.replaceWith(content);
          const newBody = loadHtml($, encoding);
          response.body = newBody;
          Object.assign( responseDetail, { response });
        }
      }

    }

    return new Promise((resolve) => {
      resolve(responseDetail);
    });
  }
};