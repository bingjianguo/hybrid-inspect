"use strict";
var socketio = require("socket.io");
var fs = require("fs");
var path = require("path");
var dashboard_1 = require('./message/dashboard');
var client_1 = require("./message/client");
var VORLON;
(function (VORLON) {
    var Server = (function () {
        function Server(context) {
            this.dashboards = new Array();
            this.baseURLConfig = context.baseURLConfig;
            this.httpConfig = context.httpConfig;
            this.pluginsConfig = context.plugins;
            this._log = context.logger;
            this._sessions = context.sessions;
            this._clientMessage = new client_1.ClientMessage(this._sessions, this.dashboards, this._log, this.baseURLConfig);
            this._dashboardMessage = new dashboard_1.DashBoardMessage(this._sessions, this.dashboards, this._log);
        }
        Server.prototype.noCache = function (res) {
            //Add header no-cache
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
        };
        Server.prototype.addRoutes = function (app, passport) {
            var _this = this;
            app.get(this.baseURLConfig.baseURL + "/api/createsession", function (req, res) {
                _this.json(res, _this.guid());
            });
            app.get(this.baseURLConfig.baseURL + "/api/reset/:idSession", function (req, res) {
                var session = _this._sessions.get(req.params.idSession);
                if (session && session.connectedClients) {
                    for (var client in session.connectedClients) {
                        delete session.connectedClients[client];
                    }
                }
                _this._sessions.remove(req.params.idSession);
                _this.noCache(res);
                res.writeHead(200, {});
                res.end();
            });
            app.get(this.baseURLConfig.baseURL + "/api/getclients/:idSession", function (req, res) {
                var session = _this._sessions.get(req.params.idSession);
                var clients = new Array();
                if (session != null) {
                    var nbClients = 0;
                    for (var client in session.connectedClients) {
                        var currentclient = session.connectedClients[client];
                        if (currentclient.opened) {
                            clients.push(currentclient.data);
                            nbClients++;
                        }
                    }
                    _this._sessions.update(req.params.idSession, session);
                    _this._log.debug("API : GetClients nb client " + nbClients + " in session " + req.params.idSession, { type: "API", session: req.params.idSession });
                }
                else {
                    _this._log.warn("API : No client in session " + req.params.idSession, { type: "API", session: req.params.idSession });
                }
                _this.noCache(res);
                _this.json(res, clients);
            });
            app.get(this.baseURLConfig.baseURL + "/vorlon.max.js/", function (req, res) {
                res.redirect(_this.baseURLConfig.baseURL + "/vorlon.max.js/default");
            });
            app.get(this.baseURLConfig.baseURL + "/vorlon.max.js/:idsession", function (req, res) {
                _this._sendVorlonJSFile(false, req, res);
            });
            app.get(this.baseURLConfig.baseURL + "/vorlon.js", function (req, res) {
                res.redirect(_this.baseURLConfig.baseURL + "/vorlon.js/default");
            });
            app.get(this.baseURLConfig.baseURL + "/vorlon.js/:idsession", function (req, res) {
                _this._sendVorlonJSFile(false, req, res);
            });
            app.get(this.baseURLConfig.baseURL + "/vorlon.max.autostartdisabled.js", function (req, res) {
                _this._sendVorlonJSFile(false, req, res, false);
            });
            app.get(this.baseURLConfig.baseURL + "/vorlon.autostartdisabled.js", function (req, res) {
                // this._sendVorlonJSFile(true, req, res, false);
                // 这个链接地址为alipay客户端集成, 暂时改为未压缩版本,方便调试
                _this._sendVorlonJSFile(false, req, res, false);
                // 重定向到独立的basement的js地址
                // res.redirect("https://a.test.alipay.net/g/industryprod/dom-dumper/0.0.1/index.js");
            });
            app.get(this.baseURLConfig.baseURL + "/getplugins/:idsession", function (req, res) {
                _this.noCache(res);
                _this._sendConfigJson(req, res);
            });
            app.post(this.baseURLConfig.baseURL + "/setplugin/:pluginid/name", function (req, res) {
                _this.setPluginName(req, res);
            });
            app.post(this.baseURLConfig.baseURL + "/setplugin/positions", function (req, res) {
                _this.setPluginsPosition(req, res);
            });
            app.get(this.baseURLConfig.baseURL + "/setplugin/:pluginid/state", function (req, res) {
                _this.setPluginState(req, res);
            });
            app.post(this.baseURLConfig.baseURL + "/setplugin/:pluginid/panel", function (req, res) {
                _this.setPluginPanel(req, res);
            });
            app.get(this.baseURLConfig.baseURL + "/getplugin/:pluginfolder/icon", function (req, res) {
                _this.noCache(res);
                _this.sendPluginIcon(req, res);
            });
            app.get(this.baseURLConfig.baseURL + "/vorlon.node.max.js/", function (req, res) {
                res.redirect("/vorlon.node.max.js/default");
            });
            app.get(this.baseURLConfig.baseURL + "/vorlon.node.max.js/:idsession", function (req, res) {
                _this._sendVorlonJSFile(false, req, res, false, true);
            });
            app.get(this.baseURLConfig.baseURL + "/vorlon.node.js/", function (req, res) {
                res.redirect("/vorlon.node.js/default");
            });
            app.get(this.baseURLConfig.baseURL + "/vorlon.node.js/:idsession", function (req, res) {
                _this._sendVorlonJSFile(true, req, res, false, true);
            });
            app.get(this.baseURLConfig.baseURL + "/api/getallclients", function (req, res) {
                _this.noCache(res);
                _this._sendClientListJson(req, res);
            });
        };
        Server.prototype.sendPluginIcon = function (req, res) {
            var pluginfolder = req.params.pluginfolder;
            try {
                var icon = fs.readFileSync(path.join(__dirname, "../public/vorlon/plugins/" + pluginfolder + "/icon.png"));
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(icon, 'binary');
            }
            catch (err) {
                var icon = fs.readFileSync(path.join(__dirname, "../public/images/no_img.png"));
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(icon, 'binary');
            }
        };
        Server.prototype.setPluginState = function (req, res) {
            var _this = this;
            var pluginid = req.params.pluginid;
            this.pluginsConfig.setPluginState(pluginid, function (err) {
                if (err) {
                    _this._log.error("SET_PLUGIN_STATE : " + err);
                    res.header('Content-Type', 'application/json');
                    return res.send({ 'error': true });
                }
                res.header('Content-Type', 'application/json');
                return res.send({ 'error': false });
            });
        };
        Server.prototype.setPluginsPosition = function (req, res) {
            var _this = this;
            var positions = req.body.positions;
            this.pluginsConfig.setPluginsPosition(positions, function (err) {
                if (err) {
                    _this._log.error("SET_PLUGINS_POSITION : " + err);
                    res.header('Content-Type', 'application/json');
                    return res.send({ 'error': true });
                }
                res.header('Content-Type', 'application/json');
                return res.send({ 'error': false });
            });
        };
        Server.prototype.setPluginName = function (req, res) {
            var _this = this;
            var pluginid = req.params.pluginid;
            var name = req.body.name;
            this.pluginsConfig.setPluginName(pluginid, name, function (err) {
                if (err) {
                    _this._log.error("SET_PLUGIN_NAME : " + err);
                    res.header('Content-Type', 'application/json');
                    return res.send({ 'error': true });
                }
                res.header('Content-Type', 'application/json');
                return res.send({ 'error': false });
            });
        };
        Server.prototype.setPluginPanel = function (req, res) {
            var _this = this;
            var pluginid = req.params.pluginid;
            var panel = req.body.panel;
            this.pluginsConfig.setPluginPanel(pluginid, panel, function (err) {
                if (err) {
                    _this._log.error("SET_PLUGIN_PANEL : " + err);
                    res.header('Content-Type', 'application/json');
                    return res.send({ 'error': true });
                }
                res.header('Content-Type', 'application/json');
                return res.send({ 'error': false });
            });
        };
        Server.prototype._sendConfigJson = function (req, res) {
            var _this = this;
            var sessionid = req.params.idsession || "default";
            this.pluginsConfig.getPluginsFor(sessionid, function (err, catalog) {
                if (err) {
                    _this._log.error("ROUTE : Error reading config.json file");
                    return;
                }
                var catalogdata = JSON.stringify(catalog);
                res.header('Content-Type', 'application/json');
                res.header('Access-Control-Allow-Origin', '*');
                res.send(catalogdata);
            });
        };
        Server.prototype._sendClientListJson = function (req, res) {
            var _this = this;
            this.noCache(res);
            var sessions = this._sessions.all();
            var clients = [];
            /**
             * "sessionId":"default",
             * "currentClientId":"91651b46-67bb-4252-a0e9-76c144a1dfd1",
             * "nbClients":1,
             * "connectedClients":[]
             */
            sessions.forEach(function (session) {
                var connectedClients = session.connectedClients;
                var sessionId = session.sessionId, currentClientId = session.currentClientId;
                _this._log.warn(' [vorlon] _sendClientListJson ' + JSON.stringify(session));
                clients.push({
                    sessionId: sessionId,
                    currentClientId: currentClientId
                });
                // connectedClients.forEach((client) => {
                //     clients.push(client.data());
                // });
            });
            this.json(res, clients);
        };
        Server.prototype._sendVorlonJSFile = function (ismin, req, res, autostart, nodeOnly) {
            var _this = this;
            if (autostart === void 0) { autostart = true; }
            if (nodeOnly === void 0) { nodeOnly = false; }
            var javascriptFile;
            var sessionid = req.params.idsession || "default";
            this.pluginsConfig.getPluginsFor(sessionid, function (err, catalog) {
                if (err) {
                    _this._log.error("ROUTE : Error getting plugins");
                    return;
                }
                var baseUrl = _this.baseURLConfig.baseURL;
                var vorlonpluginfiles = "";
                var javascriptFile = "";
                javascriptFile += 'var vorlonBaseURL="' + baseUrl + '";\n';
                //read the socket.io file if needed
                if (nodeOnly) {
                    javascriptFile += "var io = require('socket.io-client');\n";
                }
                else if (catalog.includeSocketIO) {
                    javascriptFile += fs.readFileSync(path.join(__dirname, "../public/javascripts/socket.io-1.7.3.js"));
                }
                if (ismin) {
                    vorlonpluginfiles += fs.readFileSync(path.join(__dirname, "../public/vorlon/vorlon-noplugin.min.js"));
                }
                else {
                    vorlonpluginfiles += fs.readFileSync(path.join(__dirname, "../public/vorlon/vorlon-noplugin.js"));
                }
                for (var pluginid = 0; pluginid < catalog.plugins.length; pluginid++) {
                    var plugin = catalog.plugins[pluginid];
                    if (plugin && plugin.enabled) {
                        if (nodeOnly && !plugin.nodeCompliant) {
                            continue;
                        }
                        //Read Vorlon.js file
                        if (ismin) {
                            vorlonpluginfiles += fs.readFileSync(path.join(__dirname, "../public/vorlon/plugins/" + plugin.foldername + "/vorlon." + plugin.foldername + ".client.min.js"));
                        }
                        else {
                            vorlonpluginfiles += fs.readFileSync(path.join(__dirname, "../public/vorlon/plugins/" + plugin.foldername + "/vorlon." + plugin.foldername + ".client.js"));
                        }
                    }
                }
                vorlonpluginfiles = vorlonpluginfiles.replace('"vorlon/plugins"', '"' + _this.httpConfig.protocol + '://' + req.headers.host + baseUrl + '/vorlon/plugins"');
                javascriptFile += "\r" + vorlonpluginfiles;
                javascriptFile += "if (((typeof window != 'undefined' && window.module) || (typeof module != 'undefined')) && typeof module.exports != 'undefined') {\r\n";
                javascriptFile += "module.exports = VORLON;};\r\n";
                var startUrl = _this.httpConfig.protocol + "://" + req.headers.host;
                if (baseUrl) {
                    var splittedBaseUrl = baseUrl.split('//');
                    startUrl = splittedBaseUrl[splittedBaseUrl.length - 1] === _this.httpConfig.protocol ? baseUrl : startUrl + baseUrl;
                }
                if (autostart) {
                    javascriptFile += "\r (function() { VORLON.Core.StartClientSide('" + startUrl + "/', '" + req.params.idsession + "'); }());";
                }
                res.header('Content-Type', 'application/javascript');
                res.header('Access-Control-Allow-Origin', '*');
                res.send(javascriptFile);
            });
        };
        Server.prototype.start = function (httpServer) {
            var _this = this;
            //SOCKET.IO
            var io = socketio(httpServer, { path: this.baseURLConfig.baseURL + "/socket.io" });
            this._io = io;
            //Listen on /
            this._io
                .of(this.baseURLConfig.baseURL + "/client")
                .on("connection", function (socket) {
                _this._clientMessage.add(socket);
            });
            //Listen on /dashboard
            this._io
                .of(this.baseURLConfig.baseURL + "/dashboard")
                .on("connection", function (socket) {
                _this._dashboardMessage.add(socket);
            });
        };
        Object.defineProperty(Server.prototype, "io", {
            get: function () {
                return this._io;
            },
            set: function (io) {
                this._io = io;
            },
            enumerable: true,
            configurable: true
        });
        Server.prototype.guid = function () {
            return "xxxxxxxx".replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        Server.prototype.json = function (res, data) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            if (typeof data === "string")
                res.write(data);
            else
                res.write(JSON.stringify(data));
            res.end();
        };
        return Server;
    }());
    VORLON.Server = Server;
})(VORLON = exports.VORLON || (exports.VORLON = {}));
