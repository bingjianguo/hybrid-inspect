
/**
 * Created by bingjian on 2017/3/23.
 */
const { certMgr } = require('anyproxy').utils;
const certManager = certMgr;
const util = require('util');
const homedir = require('homedir');
const servercontext = require("../Server/config/vorlon.servercontext");
const vorlonServer = require("../Server/Scripts/vorlon.server");
const vorlonDashboard = require("../Server/Scripts/vorlon.dashboard");
const vorlonWebserver = require("../Server/Scripts/vorlon.webServer");
const vorlonHttpProxy = require("../Server/Scripts/vorlon.httpproxy.server");
const winstonLogger = require("../Server/Scripts/vorlon.winstonlogger");

const PORT = 5680;
const home = homedir();

/**
 * 获取本地IP地址
 * @returns {string}
 */
function getIPAddress(){
  const interfaces = require('os').networkInterfaces();
  const keys = Object.keys(interfaces);

  for(let iIndex = 0; iIndex < keys.length; iIndex++) {
    const iface = interfaces[keys[iIndex]];
    for(let i=0; i < iface.length; i++) {
      var alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
  return '127.0.0.1';
}

/**
 * 启动入口
 * @param home
 * @returns {Promise}
 */
const startup = (home) => {

  const host = getIPAddress();
  let outerResolve = null;
  certManager.getCertificate(host,  (error, keyContent, crtContent)  => {
    process.env.HOME = home;
    process.env.PORT= PORT;
    process.env.HOST= host;
    process.env.PROXY_HOST= host;
    process.env.SSLkey= keyContent;
    process.env.SSLcert= crtContent;


    var context = new servercontext.VORLON.DefaultContext();

    if (!context.httpConfig.proxyEnvPort) {
      const logger = new winstonLogger.VORLON.WinstonLogger(context);
      //WEBSERVER
      const webServer = new vorlonWebserver.VORLON.WebServer(context);
      //DASHBOARD
      const dashboard = new vorlonDashboard.VORLON.Dashboard(context);
      //VORLON SERVER
      const server = new vorlonServer.VORLON.Server(context);
      //VORLON HTTPPROXY
      const HttpProxy = new vorlonHttpProxy.VORLON.HttpProxy(context, false);
      webServer.components.push(logger);
      webServer.components.push(dashboard);
      webServer.components.push(server);
      webServer.components.push(HttpProxy);
      webServer.start();
    }
    else {
      var serverProxy = new vorlonHttpProxy.VORLON.HttpProxy(context, true);
      serverProxy.start();
    }

  });

};


startup(home);


