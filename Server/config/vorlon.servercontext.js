"use strict";
var httpConfig = require("./vorlon.httpconfig");
var baseUrlConfig = require("./vorlon.baseurlconfig");
var logConfig = require("./vorlon.logconfig");
var pluginsConfig = require("./vorlon.pluginsconfig");
var redisConfig = require("./vorlon.redisconfig");
var tools = require("../Scripts/vorlon.tools");
var VORLON;
(function (VORLON) {
    var SimpleConsoleLogger = (function () {
        function SimpleConsoleLogger() {
        }
        SimpleConsoleLogger.prototype.debug = function () {
            console.log.apply(null, arguments);
        };
        SimpleConsoleLogger.prototype.info = function () {
            console.info.apply(null, arguments);
        };
        SimpleConsoleLogger.prototype.warn = function () {
            console.warn.apply(null, arguments);
        };
        SimpleConsoleLogger.prototype.error = function () {
            console.error.apply(null, arguments);
        };
        return SimpleConsoleLogger;
    }());
    VORLON.SimpleConsoleLogger = SimpleConsoleLogger;
    var SessionManager = (function () {
        function SessionManager() {
            this.sessions = [];
        }
        SessionManager.prototype.add = function (sessionId, session) {
            session.sessionId = sessionId;
            this.sessions[sessionId] = session;
            if (this.logger)
                this.logger.debug("session " + sessionId + " added");
            if (this.onsessionadded)
                this.onsessionadded(session);
        };
        SessionManager.prototype.get = function (sessionId) {
            return this.sessions[sessionId];
        };
        SessionManager.prototype.remove = function (sessionId) {
            var session = this.sessions[sessionId];
            if (this.logger)
                this.logger.debug("session " + sessionId + " removed");
            delete this.sessions[sessionId];
            if (this.onsessionremoved)
                this.onsessionremoved(session);
        };
        SessionManager.prototype.update = function (sessionId, session) {
            this.sessions[sessionId] = session;
            if (this.logger)
                this.logger.debug("session " + sessionId + " update");
            if (this.onsessionupdated)
                this.onsessionupdated(session);
        };
        SessionManager.prototype.all = function () {
            var items = [];
            for (var n in this.sessions) {
                items.push(this.sessions[n]);
            }
            return items;
        };
        return SessionManager;
    }());
    VORLON.SessionManager = SessionManager;
    var Session = (function () {
        function Session() {
            this.sessionId = "";
            this.currentClientId = "";
            this.nbClients = -1;
            this.connectedClients = new Array();
        }
        return Session;
    }());
    VORLON.Session = Session;
    var Client = (function () {
        function Client(clientId, ua, noWindow, socket, displayId, url, title, opened) {
            if (opened === void 0) { opened = true; }
            this.clientId = clientId;
            this.ua = ua;
            this.socket = socket;
            this.displayId = displayId;
            this.opened = opened;
            this.noWindow = noWindow;
            this.name = tools.VORLON.Tools.GetOperatingSystem(this.ua);
            this.icon = tools.VORLON.Tools.GetIconSystem(this.name);
            this.url = url;
            this.title = title;
            this.heart = true;
        }
        Object.defineProperty(Client.prototype, "data", {
            get: function () {
                return {
                    "clientid": this.clientId,
                    "displayid": this.displayId,
                    "ua": this.ua,
                    "identity": this.identity,
                    "name": this.name,
                    "icon": this.icon,
                    "noWindow": this.noWindow,
                    "url": this.url,
                    "opened": this.opened,
                    "title": this.title,
                    "heart": this.heart,
                };
            },
            enumerable: true,
            configurable: true
        });
        return Client;
    }());
    VORLON.Client = Client;
    var DefaultContext = (function () {
        function DefaultContext() {
            this.httpConfig = new httpConfig.VORLON.HttpConfig();
            this.baseURLConfig = new baseUrlConfig.VORLON.BaseURLConfig();
            this.logConfig = new logConfig.VORLON.LogConfig();
            this.redisConfig = new redisConfig.VORLON.RedisConfig();
            this.plugins = new pluginsConfig.VORLON.PluginsConfig();
            this.sessions = new SessionManager();
        }
        return DefaultContext;
    }());
    VORLON.DefaultContext = DefaultContext;
})(VORLON = exports.VORLON || (exports.VORLON = {}));
