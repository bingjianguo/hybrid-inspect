"use strict";
var interface_1 = require('./interface');
var vorloncontext = require("../../config/vorlon.servercontext");
var ClientMessage = (function () {
    function ClientMessage(_sessions, dashboards, _log, baseURLConfig) {
        this._sessions = _sessions;
        this.dashboards = dashboards;
        this._log = _log;
        this.baseURLConfig = baseURLConfig;
        this._mapChunkMessage = {};
    }
    /**
     * 启动心跳机制
     * @param client
     */
    ClientMessage.prototype._startHeart = function (client) {
        var _this = this;
        (function (id) {
            var bInQuering = true;
            var queryHeart = function () {
                bInQuering = true;
                setTimeout(function () {
                    if (!client.opened) {
                        _this._log.warn('in heart when the client open set to false');
                        return;
                    }
                    if (client.socket.id != id) {
                        return;
                    }
                    // dashboard会在切换客户端的时候发生变化,所以每次要重新获取
                    var dashboard = _this.dashboards[_this._sessionId];
                    if (bInQuering) {
                        // 设置client的状态为心跳失败
                        // 在这儿给dashboard发送消息，设置显示状态
                        client.heart = false;
                        dashboard && dashboard.emit("heart", client.data);
                    }
                    else {
                        // 设置client的状态为心跳成功
                        // 在这儿给dashboard发送消息，设置显示状态
                        client.heart = true;
                        dashboard && dashboard.emit("heart", client.data);
                    }
                    _this._log.warn("in heart query heart " + client.heart + " client title = " + client.title);
                    queryHeart();
                }, 6000);
            };
            client.socket.on('heart', function () {
                _this._log.warn("in heart feedback call");
                bInQuering = false;
            });
            queryHeart();
        })(client.socket.id);
    };
    /**
     *
     * @param socket
     * @param message
     */
    ClientMessage.prototype.onHelo = function (socket, message) {
        // 这里可以拿到viewId，目前返回的message当中没有页面的url地址
        var receiveMessage = JSON.parse(message);
        var metadata = receiveMessage.metadata;
        var data = receiveMessage.data;
        var session = this._sessions.get(metadata.sessionId);
        if (session == null) {
            session = new vorloncontext.VORLON.Session();
            this._sessions.add(metadata.sessionId, session);
        }
        var client = session.connectedClients[metadata.clientId];
        var dashboard = this.dashboards[metadata.sessionId];
        if (client == undefined) {
            var client = new vorloncontext.VORLON.Client(metadata.clientId, data.ua, data.noWindow, socket, ++session.nbClients, data.url, data.title);
            client.identity = data.identity;
            session.connectedClients[metadata.clientId] = client;
            this._log.debug(interface_1.formatLog("PLUGIN", "Send Add Client to dashboard (" + client.displayId + ")[" + data.ua + "] socketid = " + socket.id, receiveMessage));
            this._log.debug(interface_1.formatLog("PLUGIN", "New client (" + client.displayId + ")[" + data.ua + "] socketid = " + socket.id, receiveMessage));
        }
        else {
            client.socket = socket;
            client.opened = true;
            client.identity = data.identity;
            client.url = data.url;
            client.title = data.title;
            // 对于已经存在的client，不需要通知dashboard的socket增加信息
            this._log.debug(interface_1.formatLog("PLUGIN", "Client Reconnect (" + client.displayId + ")[" + data.ua + "] socketid=" + socket.id, receiveMessage));
        }
        if (dashboard != undefined) {
            dashboard.emit("addclient", client.data);
        }
        this._sessionId = metadata.sessionId;
        this._startHeart(client);
        this._sessions.update(metadata.sessionId, session);
        this._log.debug(interface_1.formatLog("PLUGIN", "Number clients in session : " + (session.nbClients + 1), receiveMessage));
        //If dashboard already connected to this socket send "helo" else wait
        if ((metadata.clientId != "") && (metadata.clientId == session.currentClientId)) {
            this._log.debug(interface_1.formatLog("PLUGIN", "Send helo to client to open socket : " + metadata.clientId, receiveMessage));
        }
        else {
            this._log.debug(interface_1.formatLog("PLUGIN", "New client (" + client.displayId + ") wait...", receiveMessage));
        }
    };
    /**
     *
     * @param socket
     * @param message
     */
    ClientMessage.prototype.onMessage = function (socket, message) {
        var receiveMessage = JSON.parse(message);
        var bInChunkProcess = false;
        if (receiveMessage.chunked == true) {
            bInChunkProcess = true;
            var data = receiveMessage.data;
            var metadata = receiveMessage.metadata;
            var sessionId = metadata.sessionId;
            var chunckSession = this._mapChunkMessage[sessionId];
            if (!chunckSession) {
                chunckSession = this._mapChunkMessage[sessionId] = {};
            }
            var chunkSessionMessage = chunckSession[data.name];
            if (!chunkSessionMessage) {
                chunkSessionMessage = chunckSession[data.name] = {};
            }
            chunkSessionMessage[data.index] = data.content;
            this._log.warn("Chunked Message: " + sessionId + " - " + data.name + " - " + Object.keys(chunkSessionMessage));
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
                this._log.debug("error = " + JSON.stringify(e));
            }
            delete chunckSession[data.name];
            this._log.debug("Chunk Message: " + JSON.stringify(receiveMessage) + " - chunkFinised - " + chunkFinised);
        }
        if (bInChunkProcess) {
            console.log("Handle chunk message Chunk Message meta: " + JSON.stringify(receiveMessage.metadata) + " - chunkFinised -" + chunkFinised);
        }
        var dashboard = this.dashboards[receiveMessage.metadata.sessionId];
        if (dashboard != null) {
            var session = this._sessions.get(receiveMessage.metadata.sessionId);
            if (receiveMessage.metadata.clientId === "") {
            }
            else {
                //Send message if _clientID = clientID selected by dashboard
                if (session && receiveMessage.metadata.clientId === session.currentClientId) {
                    dashboard.emit("message", message);
                    this._log.debug(interface_1.formatLog("PLUGIN", "PLUGIN=>DASHBOARD", receiveMessage));
                }
                else {
                    this._log.error(interface_1.formatLog("PLUGIN", "must be disconnected", receiveMessage));
                }
            }
        }
        else {
            this._log.error(interface_1.formatLog("PLUGIN", "no dashboard found", receiveMessage));
        }
    };
    /**
     *
     * @param socket
     * @param message
     */
    ClientMessage.prototype.onClientClosed = function (socket, message) {
        var _this = this;
        this._log.warn("CLIENT clientclosed " + message);
        var receiveMessage = JSON.parse(message);
        this._sessions.all().forEach(function (session) {
            for (var clientid in session.connectedClients) {
                var client = session.connectedClients[clientid];
                if (_this.baseURLConfig.baseURL + "/client#" + receiveMessage.data.socketid === client.socket.id) {
                    client.opened = false;
                    if (_this.dashboards[session.sessionId]) {
                        _this._log.debug(interface_1.formatLog("PLUGIN", "Send RemoveClient to Dashboard " + socket.id, receiveMessage));
                        _this.dashboards[session.sessionId].emit("removeclient", client.data);
                    }
                    else {
                        _this._log.debug(interface_1.formatLog("PLUGIN", "NOT sending RefreshClients, no Dashboard " + socket.id, receiveMessage));
                    }
                    _this._log.debug(interface_1.formatLog("PLUGIN", "Client Close " + socket.id, receiveMessage));
                }
            }
            _this._sessions.update(session.sessionId, session);
        });
    };
    ClientMessage.prototype.add = function (socket) {
        this._log.warn('------------------------------------add client-----------------');
        socket.on("helo", this.onHelo.bind(this, socket));
        socket.on("message", this.onMessage.bind(this, socket));
        socket.on("clientclosed", this.onClientClosed.bind(this, socket));
    };
    return ClientMessage;
}());
exports.ClientMessage = ClientMessage;
