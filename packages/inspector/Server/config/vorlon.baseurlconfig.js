"use strict";
var fs = require("fs");
var config = require("./vorlon.configprovider");
var VORLON;
(function (VORLON) {
    var BaseURLConfig = (function () {
        function BaseURLConfig() {
            var catalogdata = fs.readFileSync(config.VORLON.ConfigProvider.getConfigPath(), "utf8");
            var catalogstring = catalogdata.toString().replace(/^\uFEFF/, '');
            var catalog = JSON.parse(catalogstring);
            if (catalog.baseURL != undefined) {
                this.baseURL = process.env.BASE_URL || catalog.baseURL;
            }
            else {
                this.baseURL = "";
            }
            if (catalog.baseProxyURL != undefined) {
                this.baseProxyURL = process.env.BASE_PROXY_URL || catalog.baseProxyURL;
            }
            else {
                this.baseProxyURL = "";
            }
        }
        return BaseURLConfig;
    }());
    VORLON.BaseURLConfig = BaseURLConfig;
})(VORLON = exports.VORLON || (exports.VORLON = {}));
