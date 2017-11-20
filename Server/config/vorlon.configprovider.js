"use strict";
var path = require("path");
var argv = require('minimist')(process.argv.slice(2));
var VORLON;
(function (VORLON) {
    var ConfigProvider = (function () {
        function ConfigProvider() {
        }
        ConfigProvider.getConfigPath = function () {
            return argv.config ? path.join(process.cwd(), argv.config) : path.join(__dirname, "../config.json");
        };
        return ConfigProvider;
    }());
    VORLON.ConfigProvider = ConfigProvider;
})(VORLON = exports.VORLON || (exports.VORLON = {}));
