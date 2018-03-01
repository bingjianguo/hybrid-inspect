'use strict';

/**
 * Created by bingjian on 2017/3/23.
 */
var EasyCert = require('node-easy-cert');
var path = require('path');
var util = require('util');
var homedir = require('homedir');
var servercontext = require("../Server/config/vorlon.servercontext");
var vorlonServer = require("../Server/Scripts/vorlon.server");
var vorlonDashboard = require("../Server/Scripts/vorlon.dashboard");
var vorlonWebserver = require("../Server/Scripts/vorlon.webServer");
var vorlonHttpProxy = require("../Server/Scripts/vorlon.httpproxy.server");
var winstonLogger = require("../Server/Scripts/vorlon.winstonlogger");
var options = {
  rootDirPath: path.join(getUserHome(), '/.anyproxy/certificates'),
  defaultCertAttrs: [{ name: 'countryName', value: 'CN' }, { name: 'organizationName', value: 'AnyProxy' }, { shortName: 'ST', value: 'SH' }, { shortName: 'OU', value: 'AnyProxy SSL Proxy' }]
};

var certManager = new EasyCert(options);
var HOST = getIPAddress();
var PORT = 5680;
var home = homedir();

/**
 * 获取本地IP地址
 * @returns {string}
 */
function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  var keys = Object.keys(interfaces);

  for (var iIndex = 0; iIndex < keys.length; iIndex++) {
    var iface = interfaces[keys[iIndex]];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '127.0.0.1';
}

// 获取用户根目录
function getUserHome() {
  return process.env.HOME || process.env.USERPROFILE;
}

/**
 * 启动入口
 * @param home
 * @returns {Promise}
 */
var startup = function startup(home) {

  var outerResolve = null;
  certManager.getCertificate(HOST, function (error, keyContent, crtContent) {
    process.env.HOME = home;
    process.env.PORT = PORT;
    process.env.HOST = HOST;
    process.env.PROXY_HOST = HOST;
    process.env.SSLkey = keyContent;
    process.env.SSLcert = crtContent;

    var context = new servercontext.VORLON.DefaultContext();

    if (!context.httpConfig.proxyEnvPort) {
      var logger = new winstonLogger.VORLON.WinstonLogger(context);
      //WEBSERVER
      var webServer = new vorlonWebserver.VORLON.WebServer(context);
      //DASHBOARD
      var dashboard = new vorlonDashboard.VORLON.Dashboard(context);
      //VORLON SERVER
      var server = new vorlonServer.VORLON.Server(context);
      //VORLON HTTPPROXY
      var HttpProxy = new vorlonHttpProxy.VORLON.HttpProxy(context, false);
      webServer.components.push(logger);
      webServer.components.push(dashboard);
      webServer.components.push(server);
      webServer.components.push(HttpProxy);
      webServer.start();
    } else {
      var serverProxy = new vorlonHttpProxy.VORLON.HttpProxy(context, true);
      serverProxy.start();
    }
  });
};

startup(home);

module.exports.serverInfo = {
  host: HOST,
  port: PORT
};