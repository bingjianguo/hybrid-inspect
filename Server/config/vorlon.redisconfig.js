"use strict";
var VORLON;
(function (VORLON) {
    var RedisConfig = (function () {
        function RedisConfig() {
            this.fackredis = true;
            this._redisPort = 6379;
            this._redisMachine = "";
            this._redisPassword = "";
        }
        return RedisConfig;
    }());
    VORLON.RedisConfig = RedisConfig;
})(VORLON = exports.VORLON || (exports.VORLON = {}));
