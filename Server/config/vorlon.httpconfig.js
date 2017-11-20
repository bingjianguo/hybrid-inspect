"use strict";
var fs = require("fs");
var http = require("http");
var https = require("https");
var path = require("path");
var config = require("./vorlon.configprovider");
var VORLON;
(function (VORLON) {
    var HttpConfig = (function () {
        function HttpConfig() {
            var catalogdata = fs.readFileSync(config.VORLON.ConfigProvider.getConfigPath(), "utf8");
            var catalogstring = catalogdata.toString().replace(/^\uFEFF/, '');
            var catalog = JSON.parse(catalogstring);
            if (catalog.useSSL) {
                this.useSSL = true;
                this.protocol = "https";
                this.httpModule = https;
                var SSLkeyPath = '';
                var SSLcertPath = '';
                if (path.isAbsolute(catalog.SSLkey)) {
                    SSLkeyPath = catalog.SSLkey;
                }
                else {
                    SSLkeyPath = path.join(__dirname, "../", catalog.SSLkey);
                }
                if (path.isAbsolute(catalog.SSLcert)) {
                    SSLcertPath = catalog.SSLcert;
                }
                else {
                    SSLcertPath = path.join(__dirname, "../", catalog.SSLcert);
                }
                this.options = {
                    key: process.env.SSLkey || fs.readFileSync(SSLkeyPath),
                    cert: process.env.SSLcert || fs.readFileSync(SSLcertPath)
                };
            }
            else {
                this.useSSL = false;
                if (catalog.useSSLAzure) {
                    this.protocol = "https";
                    this.httpModule = http;
                }
                else {
                    this.protocol = "http";
                    this.httpModule = http;
                }
            }
            this.proxyHost = process.env.PROXY_HOST || catalog.proxyHost || 'localhost';
            this.proxyEnvPort = catalog.proxyEnvPort;
            if (catalog.proxyEnvPort)
                this.proxyPort = process.env.PORT;
            else
                this.proxyPort = catalog.proxyPort || 5050;
            this.host = process.env.HOST || catalog.host || 'localhost';
            this.port = process.env.PORT || catalog.port || 1337;
            this.proxyPort = catalog.proxyPort || 5050;
            this.enableWebproxy = catalog.enableWebproxy || false;
            this.vorlonServerURL = catalog.vorlonServerURL || "";
            this.vorlonProxyURL = catalog.vorlonProxyURL || "";
        }
        return HttpConfig;
    }());
    VORLON.HttpConfig = HttpConfig;
})(VORLON = exports.VORLON || (exports.VORLON = {}));
