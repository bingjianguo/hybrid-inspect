"use strict";
var socketio = require("socket.io");
var fs = require("fs");
var path = require("path");
var vorloncontext = require("../config/vorlon.servercontext");
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
            this._mapChunkMessage = {};
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
                console.log('in server side connection event');
                _this.addClient(socket);
            });
            //Listen on /dashboard
            this._io
                .of(this.baseURLConfig.baseURL + "/dashboard")
                .on("connection", function (socket) {
                _this.addDashboard(socket);
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
        // 启动心跳机制
        Server.prototype._startHeart = function (client) {
            var bInQuering = true;
            var maxFailedTimes = 3;
            var failedTimes = 0;
            var queryHeart = function () {
                if (failedTimes > maxFailedTimes)
                    return;
                bInQuering = true;
                setTimeout(function () {
                    if (bInQuering) {
                        // 设置client的状态为心跳失败
                        client.heart = false;
                        failedTimes++;
                    }
                    else {
                        // 设置client的状态为心跳成功
                        client.heart = true;
                        failedTimes = 0;
                    }
                    queryHeart();
                }, 5000);
            };
            client.socket.on('heart', function () {
                bInQuering = false;
            });
            queryHeart();
        };
        Server.prototype.addClient = function (socket) {
            var _this = this;
            this._log.warn('------------------------------------add client-----------------');
            socket.on("helo", function (message) {
                // 这里可以拿到viewId，目前返回的message当中没有页面的url地址
                var receiveMessage = JSON.parse(message);
                var metadata = receiveMessage.metadata;
                var data = receiveMessage.data;
                var session = _this._sessions.get(metadata.sessionId);
                if (session == null) {
                    session = new vorloncontext.VORLON.Session();
                    _this._sessions.add(metadata.sessionId, session);
                }
                var client = session.connectedClients[metadata.clientId];
                var dashboard = _this.dashboards[metadata.sessionId];
                if (client == undefined) {
                    var client = new vorloncontext.VORLON.Client(metadata.clientId, data.ua, data.noWindow, socket, ++session.nbClients, data.url, data.title);
                    client.identity = data.identity;
                    session.connectedClients[metadata.clientId] = client;
                    _this._log.debug(formatLog("PLUGIN", "Send Add Client to dashboard (" + client.displayId + ")[" + data.ua + "] socketid = " + socket.id, receiveMessage));
                    if (dashboard != undefined) {
                        dashboard.emit("addclient", client.data);
                    }
                    _this._log.debug(formatLog("PLUGIN", "New client (" + client.displayId + ")[" + data.ua + "] socketid = " + socket.id, receiveMessage));
                }
                else {
                    client.socket = socket;
                    client.opened = true;
                    client.identity = data.identity;
                    client.url = data.url;
                    client.title = data.title;
                    // 对于已经存在的client，不需要通知dashboard的socket增加信息
                    _this._log.debug(formatLog("PLUGIN", "Client Reconnect (" + client.displayId + ")[" + data.ua + "] socketid=" + socket.id, receiveMessage));
                }
                _this._startHeart(client);
                _this._sessions.update(metadata.sessionId, session);
                _this._log.debug(formatLog("PLUGIN", "Number clients in session : " + (session.nbClients + 1), receiveMessage));
                //If dashboard already connected to this socket send "helo" else wait
                if ((metadata.clientId != "") && (metadata.clientId == session.currentClientId)) {
                    _this._log.debug(formatLog("PLUGIN", "Send helo to client to open socket : " + metadata.clientId, receiveMessage));
                }
                else {
                    _this._log.debug(formatLog("PLUGIN", "New client (" + client.displayId + ") wait...", receiveMessage));
                }
            });
            socket.on("message", function (message) {
                var receiveMessage = JSON.parse(message);
                var bInChunkProcess = false;
                if (receiveMessage.chunked == true) {
                    bInChunkProcess = true;
                    var data = receiveMessage.data;
                    var metadata = receiveMessage.metadata;
                    var sessionId = metadata.sessionId;
                    var chunckSession = _this._mapChunkMessage[sessionId];
                    if (!chunckSession) {
                        chunckSession = _this._mapChunkMessage[sessionId] = {};
                    }
                    var chunkSessionMessage = chunckSession[data.name];
                    if (!chunkSessionMessage) {
                        chunkSessionMessage = chunckSession[data.name] = {};
                    }
                    chunkSessionMessage[data.index] = data.content;
                    _this._log.warn("Chunked Message: " + sessionId + " - " + data.name + " - " + Object.keys(chunkSessionMessage));
                    var chunkFinised = true;
                    var chunkMessageString = '';
                    for (var iIndex = 0; iIndex < data.total; iIndex++) {
                        if (!chunkSessionMessage[iIndex]) {
                            chunkFinised = false;
                            break;
                        }
                        else {
                            chunkMessageString += chunkSessionMessage[iIndex];
                        }
                    }
                    if (!chunkFinised) {
                        return;
                    }
                    try {
                        receiveMessage = JSON.parse(chunkMessageString);
                        message = chunkMessageString;
                    }
                    catch (e) {
                        _this._log.debug("error = " + JSON.stringify(e));
                    }
                    delete chunckSession[data.name];
                    _this._log.debug("Chunk Message: " + JSON.stringify(receiveMessage) + " - chunkFinised - " + chunkFinised);
                }
                if (bInChunkProcess) {
                    console.log("Handle chunk message Chunk Message meta: " + JSON.stringify(receiveMessage.metadata) + " - chunkFinised -" + chunkFinised);
                }
                var dashboard = _this.dashboards[receiveMessage.metadata.sessionId];
                if (dashboard != null) {
                    var session = _this._sessions.get(receiveMessage.metadata.sessionId);
                    if (receiveMessage.metadata.clientId === "") {
                    }
                    else {
                        //Send message if _clientID = clientID selected by dashboard
                        if (session && receiveMessage.metadata.clientId === session.currentClientId) {
                            dashboard.emit("message", message);
                            _this._log.debug(formatLog("PLUGIN", "PLUGIN=>DASHBOARD", receiveMessage));
                        }
                        else {
                            _this._log.error(formatLog("PLUGIN", "must be disconnected", receiveMessage));
                        }
                    }
                }
                else {
                    _this._log.error(formatLog("PLUGIN", "no dashboard found", receiveMessage));
                }
            });
            socket.on("clientclosed", function (message) {
                _this._log.warn("CLIENT clientclosed " + message);
                var receiveMessage = JSON.parse(message);
                _this._sessions.all().forEach(function (session) {
                    for (var clientid in session.connectedClients) {
                        var client = session.connectedClients[clientid];
                        if (_this.baseURLConfig.baseURL + "/client#" + receiveMessage.data.socketid === client.socket.id) {
                            client.opened = false;
                            if (_this.dashboards[session.sessionId]) {
                                _this._log.debug(formatLog("PLUGIN", "Send RemoveClient to Dashboard " + socket.id, receiveMessage));
                                _this.dashboards[session.sessionId].emit("removeclient", client.data);
                            }
                            else {
                                _this._log.debug(formatLog("PLUGIN", "NOT sending RefreshClients, no Dashboard " + socket.id, receiveMessage));
                            }
                            _this._log.debug(formatLog("PLUGIN", "Client Close " + socket.id, receiveMessage));
                        }
                    }
                    _this._sessions.update(session.sessionId, session);
                });
            });
        };
        Server.prototype.addDashboard = function (socket) {
            var _this = this;
            socket.on("helo", function (message) {
                //this._log.warn("DASHBOARD helo " + message);
                var receiveMessage = JSON.parse(message);
                var metadata = receiveMessage.metadata;
                var dashboard = _this.dashboards[metadata.sessionId];
                if (dashboard == null) {
                    _this._log.debug(formatLog("DASHBOARD", "New Dashboard", receiveMessage));
                }
                else {
                    _this._log.debug(formatLog("DASHBOARD", "Reconnect", receiveMessage));
                }
                _this.dashboards[metadata.sessionId] = socket;
                dashboard = socket;
                //if client listen by dashboard send helo to selected client
                if (metadata.listenClientId !== "") {
                    _this._log.debug(formatLog("DASHBOARD", "Client selected for :" + metadata.listenClientId, receiveMessage));
                    var session = _this._sessions.get(metadata.sessionId);
                    if (session != undefined) {
                        _this._log.debug(formatLog("DASHBOARD", "Change currentClient " + metadata.clientId, receiveMessage));
                        session.currentClientId = metadata.listenClientId;
                        for (var clientId in session.connectedClients) {
                            var client = session.connectedClients[clientId];
                            if (client.clientId === metadata.listenClientId) {
                                if (client.socket != null) {
                                    _this._log.debug(formatLog("DASHBOARD", "Send helo to socketid :" + client.socket.id, receiveMessage));
                                    client.socket.emit("helo", metadata.listenClientId);
                                }
                            }
                            else {
                                _this._log.debug(formatLog("DASHBOARD", "Wait for socketid (" + client.socket.id + ")", receiveMessage));
                            }
                        }
                        //Send Helo to DashBoard
                        _this._log.debug(formatLog("DASHBOARD", "Send helo to Dashboard", receiveMessage));
                        socket.emit("helo", metadata.listenClientId);
                    }
                }
                else {
                    _this._log.debug(formatLog("DASHBOARD", "No client selected for this dashboard"));
                    if (session != undefined) {
                        _this._sessions.update(metadata.sessionId, session);
                    }
                }
            });
            socket.on("reload", function (message) {
                //this._log.warn("DASHBOARD reload " + message);
                var receiveMessage = JSON.parse(message);
                var metadata = receiveMessage.metadata;
                //if client listen by dashboard send reload to selected client
                if (metadata.listenClientId !== "") {
                    _this._log.debug(formatLog("DASHBOARD", "Client selected for :" + metadata.listenClientId, receiveMessage));
                    var session = _this._sessions.get(metadata.sessionId);
                    if (session != undefined) {
                        _this._log.debug(formatLog("DASHBOARD", "Change currentClient " + metadata.clientId, receiveMessage));
                        session.currentClientId = metadata.listenClientId;
                        for (var clientId in session.connectedClients) {
                            var client = session.connectedClients[clientId];
                            if (client.clientId === metadata.listenClientId) {
                                if (client.socket != null) {
                                    _this._log.debug(formatLog("DASHBOARD", "Send reload to socketid :" + client.socket.id, receiveMessage));
                                    client.socket.emit("reload", metadata.listenClientId);
                                }
                            }
                            else {
                                _this._log.debug(formatLog("DASHBOARD", "Wait for socketid (" + client.socket.id + ")", receiveMessage));
                            }
                        }
                    }
                }
                else {
                    _this._log.debug(formatLog("DASHBOARD", "No client selected for this dashboard"));
                    if (session != undefined) {
                        _this._sessions.update(metadata.sessionId, session);
                    }
                }
            });
            socket.on("protocol", function (message) {
                //this._log.warn("DASHBOARD protocol " + message);
                var receiveMessage = JSON.parse(message);
                var metadata = receiveMessage.metadata;
                var dashboard = _this.dashboards[metadata.sessionId];
                if (dashboard == null) {
                    _this._log.error(formatLog("DASHBOARD", "No Dashboard to send message", receiveMessage));
                }
                else {
                    dashboard.emit("message", message);
                    _this._log.debug(formatLog("DASHBOARD", "Dashboard send message", receiveMessage));
                }
            });
            socket.on("identify", function (message) {
                _this._log.warn("DASHBOARD identify " + message);
                var receiveMessage = JSON.parse(message);
                var metadata = receiveMessage.metadata;
                _this._log.debug(formatLog("DASHBOARD", "Identify clients", receiveMessage));
                var session = _this._sessions.get(metadata.sessionId);
                if (session != null) {
                    var nbClients = 0;
                    var data_1 = receiveMessage.data;
                    if (data_1.clientId) {
                        var targetClients = Object.keys(session.connectedClients).filter(function (key) {
                            return key == data_1.clientId;
                        });
                        if (targetClients.length > 0) {
                            var targetClient = session.connectedClients[targetClients[0]];
                            if (targetClient.opened && targetClient.clientId == data_1.clientId) {
                                _this._log.warn('finded target');
                                targetClient.socket.emit("identify", targetClient.displayId);
                            }
                        }
                    }
                    else {
                        for (var client in session.connectedClients) {
                            var currentclient = session.connectedClients[client];
                            if (currentclient.opened) {
                                _this._log.warn('find targetClients identify' + JSON.stringify(currentclient.data));
                                currentclient.socket.emit("identify", currentclient.displayId);
                                _this._log.debug(formatLog("DASHBOARD", "Dashboard send identify " + currentclient.displayId + " to socketid : " + currentclient.socket.id, receiveMessage));
                                nbClients++;
                            }
                        }
                        _this._log.debug(formatLog("DASHBOARD", "Send " + session.nbClients + " identify(s)", receiveMessage));
                    }
                }
                else {
                    _this._log.error(formatLog("DASHBOARD", " No client to identify...", receiveMessage));
                    if (session != undefined) {
                        _this._sessions.update(metadata.sessionId, session);
                    }
                }
            });
            socket.on('closeclient', function (message) {
                _this._log.warn("DASHBOARD closeclient " + message);
                var receiveMessage = JSON.parse(message);
                _this._sessions.all().forEach(function (session) {
                    for (var clientid in session.connectedClients) {
                        var client = session.connectedClients[clientid];
                        if (receiveMessage.data.clientid === client.clientId) {
                            client.opened = false;
                            if (_this.dashboards[session.sessionId]) {
                                _this.dashboards[session.sessionId].emit("removeclient", client.data);
                            }
                        }
                    }
                    _this._sessions.update(session.sessionId, session);
                });
            });
            socket.on("message", function (message) {
                _this._log.warn("DASHBOARD message " + message);
                var receiveMessage = JSON.parse(message);
                var metadata = receiveMessage.metadata;
                var arrayClients = _this._sessions.get(metadata.sessionId);
                if (arrayClients != null) {
                    for (var clientId in arrayClients.connectedClients) {
                        var client = arrayClients.connectedClients[clientId];
                        if (metadata.listenClientId === client.clientId) {
                            client.socket.emit("message", message);
                            _this._log.debug(formatLog("DASHBOARD", "DASHBOARD=>PLUGIN", receiveMessage));
                        }
                    }
                }
                else {
                    _this._log.error(formatLog("DASHBOARD", "No client for message", receiveMessage));
                    var session = _this._sessions.get(metadata.sessionId);
                    if (session != undefined) {
                        _this._sessions.update(metadata.sessionId, session);
                    }
                }
            });
            socket.on("disconnect", function (message) {
                //Delete dashboard session
                _this._log.warn("DASHBOARD disconnect " + message);
                for (var dashboard in _this.dashboards) {
                    if (_this.dashboards[dashboard].id === socket.id) {
                        delete _this.dashboards[dashboard];
                        _this._log.debug(formatLog("DASHBOARD", "Delete dashboard " + dashboard + " socket " + socket.id));
                    }
                }
                //Send disconnect to all client
                _this._sessions.all().forEach(function (session) {
                    for (var client in session.connectedClients) {
                        session.connectedClients[client].socket.emit("stoplisten");
                    }
                });
            });
        };
        return Server;
    }());
    VORLON.Server = Server;
    function formatLog(type, message, vmessage) {
        var buffer = [];
        buffer.push(type);
        if (type.length < 10) {
            for (var i = type.length; i < 10; i++) {
                buffer.push(" ");
            }
        }
        buffer.push(" : ");
        if (vmessage) {
            if (vmessage.metadata && vmessage.metadata.sessionId)
                buffer.push(vmessage.metadata.sessionId + " ");
        }
        if (message)
            buffer.push(message + " ");
        if (vmessage) {
            if (vmessage.metadata) {
                if (vmessage.metadata.pluginID) {
                    buffer.push(vmessage.metadata.pluginID);
                    if (vmessage.command)
                        buffer.push(":" + vmessage.command);
                    buffer.push(" ");
                }
                if (vmessage.metadata.clientId) {
                    buffer.push(vmessage.metadata.clientId);
                }
            }
        }
        return buffer.join("");
    }
})(VORLON = exports.VORLON || (exports.VORLON = {}));
