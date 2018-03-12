const { getServiceRequest } = require('./rules/assets');
const ip = require('ip');

module.exports = {
  summary: 'service rule',
  *beforeSendRequest(requestDetail) {
    const { url} = requestDetail;
    const ipAddress = ip.address();
    const serviceTargetReg = /\/agentBackend\//i;
    if ( serviceTargetReg.test(url) ) {
      const ret = getServiceRequest({
        requestDetail, 
        serviceTargetReg 
      }, {
        hostname: ipAddress,
        port: 7001
      });
      return ret;
    }

  }
};