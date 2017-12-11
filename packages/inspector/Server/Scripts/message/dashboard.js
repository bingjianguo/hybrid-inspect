"use strict";
var interface_1 = require('./interface');
var DashBoardMessage = (function () {
    function DashBoardMessage(_sessions, dashboards, _log) {
        this._sessions = _sessions;
        this.dashboards = dashboards;
        this._log = _log;
    }
    DashBoardMessage.prototype.onHelo = function (socket, message) {
        //this._log.warn("DASHBOARD helo " + message);
        var receiveMessage = JSON.parse(message);
        var metadata = receiveMessage.metadata;
        var dashboard = this.dashboards[metadata.sessionId];
        if (dashboard == null) {
            this._log.debug(interface_1.formatLog("DASHBOARD", "New Dashboard", receiveMessage));
        }
        else {
            this._log.debug(interface_1.formatLog("DASHBOARD", "Reconnect", receiveMessage));
        }
        this.dashboards[metadata.sessionId] = socket;
        dashboard = socket;
        //if client listen by dashboard send helo to selected client
        if (metadata.listenClientId !== "") {
            this._log.debug(interface_1.formatLog("DASHBOARD", "Client selected for :" + metadata.listenClientId, receiveMessage));
            var session = this._sessions.get(metadata.sessionId);
            if (session != undefined) {
                this._log.debug(interface_1.formatLog("DASHBOARD", "Change currentClient " + metadata.clientId, receiveMessage));
                session.currentClientId = metadata.listenClientId;
                for (var clientId in session.connectedClients) {
                    var client = session.connectedClients[clientId];
                    if (client.clientId === metadata.listenClientId) {
                        if (client.socket != null) {
                            this._log.debug(interface_1.formatLog("DASHBOARD", "Send helo to socketid :" + client.socket.id, receiveMessage));
                            client.socket.emit("helo", metadata.listenClientId);
                        }
                    }
                    else {
                        this._log.debug(interface_1.formatLog("DASHBOARD", "Wait for socketid (" + client.socket.id + ")", receiveMessage));
                    }
                }
                //Send Helo to DashBoard
                this._log.debug(interface_1.formatLog("DASHBOARD", "Send helo to Dashboard", receiveMessage));
                socket.emit("helo", metadata.listenClientId);
            }
        }
        else {
            this._log.debug(interface_1.formatLog("DASHBOARD", "No client selected for this dashboard"));
            if (session != undefined) {
                this._sessions.update(metadata.sessionId, session);
            }
        }
    };
    /**
     *
     * @param socket
     * @param message
     */
    DashBoardMessage.prototype.onReload = function (socket, message) {
        //this._log.warn("DASHBOARD reload " + message);
        var receiveMessage = JSON.parse(message);
        var metadata = receiveMessage.metadata;
        this._log.warn('in onReload');
        //if client listen by dashboard send reload to selected client
        var session = null;
        if (metadata.listenClientId !== "") {
            session = this._sessions.get(metadata.sessionId);
            if (session != undefined) {
                session.currentClientId = metadata.listenClientId;
                for (var clientId in session.connectedClients) {
                    var client = session.connectedClients[clientId];
                    if (client.clientId === metadata.listenClientId) {
                        if (client.socket != null) {
                            client.socket.emit("reload", metadata.listenClientId);
                        }
                    }
                    else {
                        this._log.debug(interface_1.formatLog("DASHBOARD", "Wait for socketid (" + client.socket.id + ")", receiveMessage));
                    }
                }
            }
        }
        else {
            if (session != undefined) {
                this._sessions.update(metadata.sessionId, session);
            }
        }
    };
    /**
     *
     * @param socket
     * @param message
     */
    DashBoardMessage.prototype.onProtocol = function (socket, message) {
        //this._log.warn("DASHBOARD protocol " + message);
        var receiveMessage = JSON.parse(message);
        var metadata = receiveMessage.metadata;
        var dashboard = this.dashboards[metadata.sessionId];
        if (dashboard == null) {
            this._log.error(interface_1.formatLog("DASHBOARD", "No Dashboard to send message", receiveMessage));
        }
        else {
            dashboard.emit("message", message);
            this._log.debug(interface_1.formatLog("DASHBOARD", "Dashboard send message", receiveMessage));
        }
    };
    /**
     *
     * @param socket
     * @param message
     */
    DashBoardMessage.prototype.onIdentify = function (socket, message) {
        var receiveMessage = JSON.parse(message);
        var metadata = receiveMessage.metadata;
        this._log.debug(interface_1.formatLog("DASHBOARD", "Identify clients", receiveMessage));
        var session = this._sessions.get(metadata.sessionId);
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
                        targetClient.socket.emit("identify", targetClient.displayId);
                    }
                }
            }
            else {
                for (var client in session.connectedClients) {
                    var currentclient = session.connectedClients[client];
                    if (currentclient.opened) {
                        this._log.warn('find targetClients identify' + JSON.stringify(currentclient.data));
                        currentclient.socket.emit("identify", currentclient.displayId);
                        this._log.debug(interface_1.formatLog("DASHBOARD", "Dashboard send identify " + currentclient.displayId + " to socketid : " + currentclient.socket.id, receiveMessage));
                        nbClients++;
                    }
                }
                this._log.debug(interface_1.formatLog("DASHBOARD", "Send " + session.nbClients + " identify(s)", receiveMessage));
            }
        }
        else {
            this._log.error(interface_1.formatLog("DASHBOARD", " No client to identify...", receiveMessage));
            if (session != undefined) {
                this._sessions.update(metadata.sessionId, session);
            }
        }
    };
    /**
     *
     * @param socket
     * @param message
     */
    DashBoardMessage.prototype.onCloseClient = function (socket, message) {
        var _this = this;
        this._log.warn("DASHBOARD closeclient " + message);
        var receiveMessage = JSON.parse(message);
        this._sessions.all().forEach(function (session) {
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
    };
    /**
     *
     * @param socket
     * @param message
     */
    DashBoardMessage.prototype.onMessage = function (socket, message) {
        var receiveMessage = JSON.parse(message);
        var metadata = receiveMessage.metadata;
        var arrayClients = this._sessions.get(metadata.sessionId);
        if (arrayClients != null) {
            for (var clientId in arrayClients.connectedClients) {
                var client = arrayClients.connectedClients[clientId];
                if (metadata.listenClientId === client.clientId) {
                    client.socket.emit("message", message);
                    this._log.debug(interface_1.formatLog("DASHBOARD", "DASHBOARD=>PLUGIN", receiveMessage));
                }
            }
        }
        else {
            this._log.error(interface_1.formatLog("DASHBOARD", "No client for message", receiveMessage));
            var session = this._sessions.get(metadata.sessionId);
            if (session != undefined) {
                this._sessions.update(metadata.sessionId, session);
            }
        }
    };
    /**
     *
     * @param socket
     * @param message
     */
    DashBoardMessage.prototype.onDisconnect = function (socket, message) {
        //Delete dashboard session
        // this._log.warn("DASHBOARD disconnect " + message);
        for (var dashboard in this.dashboards) {
            if (this.dashboards[dashboard].id === socket.id) {
                delete this.dashboards[dashboard];
                this._log.debug(interface_1.formatLog("DASHBOARD", "Delete dashboard " + dashboard + " socket " + socket.id));
            }
        }
        //Send disconnect to all client
        this._sessions.all().forEach(function (session) {
            // 页面的clint切换后，会清除当前dashboard的所有侦听信息
            for (var client in session.connectedClients) {
                session.connectedClients[client].socket.emit("stoplisten");
            }
        });
    };
    DashBoardMessage.prototype.add = function (socket) {
        socket.on("helo", this.onHelo.bind(this, socket));
        socket.on("reload", this.onReload.bind(this, socket));
        socket.on("protocol", this.onProtocol.bind(this, socket));
        socket.on("identify", this.onIdentify.bind(this, socket));
        socket.on('closeclient', this.onCloseClient.bind(this, socket));
        socket.on("message", this.onMessage.bind(this, socket));
        socket.on("disconnect", this.onDisconnect.bind(this, socket));
    };
    return DashBoardMessage;
}());
exports.DashBoardMessage = DashBoardMessage;
