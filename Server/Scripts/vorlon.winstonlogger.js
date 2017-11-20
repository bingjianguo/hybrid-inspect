"use strict";
var winston = require("winston");
var winstonDisplay = require("winston-logs-display");
var VORLON;
(function (VORLON) {
    var WinstonLogger = (function () {
        function WinstonLogger(context) {
            this.logConfig = context.logConfig;
            //LOGS      
            winston.cli();
            this._log = new winston.Logger({
                levels: {
                    info: 0,
                    warn: 1,
                    error: 2,
                    verbose: 3,
                    api: 4,
                    dashboard: 5,
                    plugin: 6
                },
                transports: [
                    new winston.transports.File({ filename: this.logConfig.vorlonLogFile, level: this.logConfig.level })
                ],
                exceptionHandlers: [
                    new winston.transports.File({ filename: this.logConfig.exceptionsLogFile, timestamp: true, maxsize: 1000000 })
                ],
                exitOnError: false
            });
            context.logger = this._log;
            if (this.logConfig.enableConsole) {
                this._log.add(winston.transports.Console, {
                    level: this.logConfig.level,
                    handleExceptions: true,
                    json: false,
                    timestamp: function () {
                        var date = new Date();
                        return date.getFullYear() + "-" +
                            date.getMonth() + "-" +
                            date.getDate() + " " +
                            date.getHours() + ":" +
                            date.getMinutes() + ":" +
                            date.getSeconds();
                    },
                    colorize: true
                });
            }
            winston.addColors({
                info: 'green',
                warn: 'cyan',
                error: 'red',
                verbose: 'blue',
                api: 'gray',
                dashboard: 'pink',
                plugin: 'yellow'
            });
            this._log.cli();
        }
        WinstonLogger.prototype.addRoutes = function (app, passport) {
            //DisplayLogs
            winstonDisplay(app, this._log);
        };
        WinstonLogger.prototype.start = function (httpServer) {
        };
        return WinstonLogger;
    }());
    VORLON.WinstonLogger = WinstonLogger;
})(VORLON = exports.VORLON || (exports.VORLON = {}));
