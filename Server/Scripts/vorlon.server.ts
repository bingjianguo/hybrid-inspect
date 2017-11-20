import redis = require("redis");
import express = require("express");
import http = require("http");
import socketio = require("socket.io");
import fs = require("fs");
import path = require("path");

//Vorlon
import iwsc = require("./vorlon.IWebServerComponent");
import tools = require("./vorlon.tools");
import vorloncontext = require("../config/vorlon.servercontext");

export module VORLON {
  export class Server implements iwsc.VORLON.IWebServerComponent {
    private _sessions: vorloncontext.VORLON.SessionManager;
    public dashboards = new Array<SocketIO.Socket>();

    private _io: any;
    private _log: vorloncontext.VORLON.ILogger;
    private httpConfig: vorloncontext.VORLON.IHttpConfig;
    private pluginsConfig: vorloncontext.VORLON.IPluginsProvider;
    private baseURLConfig: vorloncontext.VORLON.IBaseURLConfig;
    private _mapChunkMessage: any;

    constructor(context: vorloncontext.VORLON.IVorlonServerContext) {
      this.baseURLConfig = context.baseURLConfig;
      this.httpConfig = context.httpConfig;
      this.pluginsConfig = context.plugins;
      this._log = context.logger;
      this._sessions = context.sessions;
      this._mapChunkMessage = {};
    }

    public noCache(res: any) {
      //Add header no-cache
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
    }

    public addRoutes(app: express.Express, passport: express.Response): void {
      app.get(this.baseURLConfig.baseURL + "/api/createsession", (req: any, res: any) => {
        this.json(res, this.guid());
      });

      app.get(this.baseURLConfig.baseURL + "/api/reset/:idSession", (req: any, res: any) => {
        var session = this._sessions.get(req.params.idSession);
        if (session && session.connectedClients) {
          for (var client in session.connectedClients) {
            delete session.connectedClients[client];
          }
        }
        this._sessions.remove(req.params.idSession);

        this.noCache(res);
        res.writeHead(200, {});
        res.end();
      });

      app.get(this.baseURLConfig.baseURL + "/api/getclients/:idSession", (req: any, res: any) => {
        var session = this._sessions.get(req.params.idSession);
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
          this._sessions.update(req.params.idSession, session);
          this._log.debug("API : GetClients nb client " + nbClients + " in session " + req.params.idSession, { type: "API", session: req.params.idSession });
        }
        else {
          this._log.warn("API : No client in session " + req.params.idSession, { type: "API", session: req.params.idSession });
        }

        this.noCache(res);
        this.json(res, clients);
      });

      app.get(this.baseURLConfig.baseURL + "/vorlon.max.js/", (req: any, res: any) => {
        res.redirect(this.baseURLConfig.baseURL + "/vorlon.max.js/default");
      });

      app.get(this.baseURLConfig.baseURL + "/vorlon.max.js/:idsession", (req: any, res: any) => {
        this._sendVorlonJSFile(false, req, res);
      });

      app.get(this.baseURLConfig.baseURL + "/vorlon.js", (req: any, res: any) => {
        res.redirect(this.baseURLConfig.baseURL + "/vorlon.js/default");
      });

      app.get(this.baseURLConfig.baseURL + "/vorlon.js/:idsession", (req: any, res: any) => {
        this._sendVorlonJSFile(false, req, res);
      });

      app.get(this.baseURLConfig.baseURL + "/vorlon.max.autostartdisabled.js", (req: any, res: any) => {
        this._sendVorlonJSFile(false, req, res, false);
      });

      app.get(this.baseURLConfig.baseURL + "/vorlon.autostartdisabled.js", (req: any, res: any) => {
        // this._sendVorlonJSFile(true, req, res, false);
        // 这个链接地址为alipay客户端集成, 暂时改为未压缩版本,方便调试
        this._sendVorlonJSFile(false, req, res, false);

        // 重定向到独立的basement的js地址
        // res.redirect("https://a.test.alipay.net/g/industryprod/dom-dumper/0.0.1/index.js");
      });

      app.get(this.baseURLConfig.baseURL + "/getplugins/:idsession", (req: any, res: any) => {
        this.noCache(res);
        this._sendConfigJson(req, res);
      });

      app.post(this.baseURLConfig.baseURL + "/setplugin/:pluginid/name", (req: any, res: any) => {
        this.setPluginName(req, res);
      });

      app.post(this.baseURLConfig.baseURL + "/setplugin/positions", (req: any, res: any) => {
        this.setPluginsPosition(req, res);
      });

      app.get(this.baseURLConfig.baseURL + "/setplugin/:pluginid/state", (req: any, res: any) => {
        this.setPluginState(req, res);
      });

      app.post(this.baseURLConfig.baseURL + "/setplugin/:pluginid/panel", (req: any, res: any) => {
        this.setPluginPanel(req, res);
      });

      app.get(this.baseURLConfig.baseURL + "/getplugin/:pluginfolder/icon", (req: any, res: any) => {
        this.noCache(res);
        this.sendPluginIcon(req, res);
      });

      app.get(this.baseURLConfig.baseURL + "/vorlon.node.max.js/", (req: any, res: any) => {
        res.redirect("/vorlon.node.max.js/default");
      });

      app.get(this.baseURLConfig.baseURL + "/vorlon.node.max.js/:idsession", (req: any, res: any) => {
        this._sendVorlonJSFile(false, req, res, false, true);
      });

      app.get(this.baseURLConfig.baseURL + "/vorlon.node.js/", (req: any, res: any) => {
        res.redirect("/vorlon.node.js/default");
      });

      app.get(this.baseURLConfig.baseURL + "/vorlon.node.js/:idsession", (req: any, res: any) => {
        this._sendVorlonJSFile(true, req, res, false, true);
      });

      app.get(this.baseURLConfig.baseURL + "/api/getallclients", (req: any, res: any) => {
        this.noCache(res);
        this._sendClientListJson(req, res);
      });
    }

    private sendPluginIcon(req: any, res: any) {
      var pluginfolder = req.params.pluginfolder;
      try {
        var icon = fs.readFileSync(path.join(__dirname, "../public/vorlon/plugins/" + pluginfolder + "/icon.png"));
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(icon, 'binary');
      } catch (err) {
        var icon = fs.readFileSync(path.join(__dirname, "../public/images/no_img.png"));
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(icon, 'binary');
      }
    }

    private setPluginState(req: any, res: any) {
      var pluginid = req.params.pluginid;
      this.pluginsConfig.setPluginState(pluginid, (err) => {
        if (err) {
          this._log.error("SET_PLUGIN_STATE : " + err);
          res.header('Content-Type', 'application/json');
          return res.send({ 'error': true });
        }

        res.header('Content-Type', 'application/json');
        return res.send({ 'error': false });
      });
    }

    private setPluginsPosition(req: any, res: any) {
      var positions = req.body.positions;
      this.pluginsConfig.setPluginsPosition(positions, (err) => {
        if (err) {
          this._log.error("SET_PLUGINS_POSITION : " + err);
          res.header('Content-Type', 'application/json');
          return res.send({ 'error': true });
        }

        res.header('Content-Type', 'application/json');
        return res.send({ 'error': false });
      });
    }

    private setPluginName(req: any, res: any) {
      var pluginid = req.params.pluginid;
      var name = req.body.name;
      this.pluginsConfig.setPluginName(pluginid, name, (err) => {
        if (err) {
          this._log.error("SET_PLUGIN_NAME : " + err);
          res.header('Content-Type', 'application/json');
          return res.send({ 'error': true });
        }

        res.header('Content-Type', 'application/json');
        return res.send({ 'error': false });
      });
    }

    private setPluginPanel(req: express.Request, res: express.Response) {
      var pluginid = req.params.pluginid;
      var panel = req.body.panel;
      this.pluginsConfig.setPluginPanel(pluginid, panel, (err) => {
        if (err) {
          this._log.error("SET_PLUGIN_PANEL : " + err);
          res.header('Content-Type', 'application/json');
          return res.send({ 'error': true });
        }

        res.header('Content-Type', 'application/json');
        return res.send({ 'error': false });
      });
    }

    private _sendConfigJson(req: any, res: any) {

      var sessionid = req.params.idsession || "default";
      this.pluginsConfig.getPluginsFor(sessionid, (err, catalog) => {
        if (err) {
          this._log.error("ROUTE : Error reading config.json file");
          return;
        }

        var catalogdata = JSON.stringify(catalog);
        res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.send(catalogdata);
      });
    }

    private _sendClientListJson(req: any, res: any) {
      this.noCache(res);
      const sessions = this._sessions.all();
      const clients = [];
      /**
       * "sessionId":"default",
       * "currentClientId":"91651b46-67bb-4252-a0e9-76c144a1dfd1",
       * "nbClients":1,
       * "connectedClients":[]
       */
      sessions.forEach((session) => {
        const connectedClients = session.connectedClients;
        const { sessionId, currentClientId } = session;
        this._log.warn(' [vorlon] _sendClientListJson ' + JSON.stringify(session));
        clients.push({
          sessionId,
          currentClientId
        });
        // connectedClients.forEach((client) => {
        //     clients.push(client.data());
        // });
      })

      this.json(res, clients);
    }

    private _sendVorlonJSFile(ismin: boolean, req: any, res: any, autostart: boolean = true, nodeOnly = false) {
      var javascriptFile: string;
      var sessionid = req.params.idsession || "default";

      this.pluginsConfig.getPluginsFor(sessionid, (err, catalog) => {
        if (err) {
          this._log.error("ROUTE : Error getting plugins");
          return;
        }

        var baseUrl = this.baseURLConfig.baseURL;
        var vorlonpluginfiles: string = "";
        var javascriptFile: string = "";

        javascriptFile += 'var vorlonBaseURL="' + baseUrl + '";\n';

        //read the socket.io file if needed
        if (nodeOnly) {
          javascriptFile += "var io = require('socket.io-client');\n"
        } else if (catalog.includeSocketIO) {
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

        vorlonpluginfiles = vorlonpluginfiles.replace('"vorlon/plugins"', '"' + this.httpConfig.protocol + '://' + req.headers.host + baseUrl + '/vorlon/plugins"');
        javascriptFile += "\r" + vorlonpluginfiles;

        javascriptFile += "if (((typeof window != 'undefined' && window.module) || (typeof module != 'undefined')) && typeof module.exports != 'undefined') {\r\n";
        javascriptFile += "module.exports = VORLON;};\r\n";

        var startUrl = this.httpConfig.protocol + "://" + req.headers.host;
        if (baseUrl) {
          var splittedBaseUrl = baseUrl.split('//');
          startUrl = splittedBaseUrl[splittedBaseUrl.length - 1] === this.httpConfig.protocol ? baseUrl : startUrl + baseUrl;
        }

        if (autostart) {
          javascriptFile += "\r (function() { VORLON.Core.StartClientSide('" + startUrl + "/', '" + req.params.idsession + "'); }());";
        }

        res.header('Content-Type', 'application/javascript');
        res.header('Access-Control-Allow-Origin', '*');
        res.send(javascriptFile);
      });
    }

    public start(httpServer: http.Server): void {

      //SOCKET.IO
      var io = socketio(httpServer, { path: this.baseURLConfig.baseURL + "/socket.io" });
      this._io = io;

      //Listen on /
      this._io
        .of(this.baseURLConfig.baseURL + "/client")
        .on("connection", socket => {
          console.log('in server side connection event');
          this.addClient(socket);
        });

      //Listen on /dashboard
      this._io
        .of(this.baseURLConfig.baseURL + "/dashboard")
        .on("connection", socket => {
          this.addDashboard(socket);
        });
    }

    public get io(): any {
      return this._io;
    }

    public set io(io: any) {
      this._io = io;
    }

    private guid(): string {
      return "xxxxxxxx".replace(/[xy]/g, c => {
        var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    private json(res, data) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      if (typeof data === "string")
        res.write(data);
      else
        res.write(JSON.stringify(data));
      res.end();
    }

    // 启动心跳机制
    private _startHeart(client: vorloncontext.VORLON.Client): void {
      let bInQuering = true;
      const maxFailedTimes = 3;
      let failedTimes = 0;
      const queryHeart = () => {
        if ( failedTimes > maxFailedTimes )
            return;
        bInQuering = true;

        setTimeout(() => {
          if ( bInQuering ) {
            // 设置client的状态为心跳失败
            client.heart = false;
            failedTimes++;
          } else {
            // 设置client的状态为心跳成功
            client.heart = true;
            failedTimes = 0;
          }

          queryHeart();
        },5000);
      };
      client.socket.on('heart', () => {
        bInQuering = false;
      });

      queryHeart();
    }


    public addClient(socket: SocketIO.Socket): void {
      this._log.warn('------------------------------------add client-----------------')
      socket.on("helo", (message: string) => {
        // 这里可以拿到viewId，目前返回的message当中没有页面的url地址
        var receiveMessage = <VorlonMessage>JSON.parse(message);
        var metadata = receiveMessage.metadata;
        var data = receiveMessage.data;
        var session = this._sessions.get(metadata.sessionId);

        if (session == null) {
          session = new vorloncontext.VORLON.Session();
          this._sessions.add(metadata.sessionId, session);
        }

        var client = <vorloncontext.VORLON.Client>session.connectedClients[metadata.clientId];
        var dashboard = this.dashboards[metadata.sessionId];
        if (client == undefined) {
          var client = new vorloncontext.VORLON.Client(metadata.clientId, data.ua, data.noWindow, socket, ++session.nbClients, data.url, data.title);
          client.identity = data.identity;
          session.connectedClients[metadata.clientId] = client;
          this._log.debug(formatLog("PLUGIN", "Send Add Client to dashboard (" + client.displayId + ")[" + data.ua + "] socketid = " + socket.id, receiveMessage));
          if (dashboard != undefined) {
            dashboard.emit("addclient", client.data);
          }

          this._log.debug(formatLog("PLUGIN", "New client (" + client.displayId + ")[" + data.ua + "] socketid = " + socket.id, receiveMessage));
        } else {
          client.socket = socket;
          client.opened = true;
          client.identity = data.identity;
          client.url = data.url;
          client.title = data.title;
          // 对于已经存在的client，不需要通知dashboard的socket增加信息
          this._log.debug(formatLog("PLUGIN", "Client Reconnect (" + client.displayId + ")[" + data.ua + "] socketid=" + socket.id, receiveMessage));
        }

        this._startHeart(client);

        this._sessions.update(metadata.sessionId, session);

        this._log.debug(formatLog("PLUGIN", "Number clients in session : " + (session.nbClients + 1), receiveMessage));

        //If dashboard already connected to this socket send "helo" else wait
        if ((metadata.clientId != "") && (metadata.clientId == session.currentClientId)) {
          this._log.debug(formatLog("PLUGIN", "Send helo to client to open socket : " + metadata.clientId, receiveMessage));
          //socket.emit("helo", metadata.clientId);
        }
        else {
          this._log.debug(formatLog("PLUGIN", "New client (" + client.displayId + ") wait...", receiveMessage));
        }
      });

      socket.on("message", (message: string) => {

        var receiveMessage = <VorlonMessage>JSON.parse(message);
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
            } else {
              chunkMessageString += chunkSessionMessage[iIndex];
            }
          }

          if (!chunkFinised) {
            return;
          }

          try {
            receiveMessage = <VorlonMessage>JSON.parse(chunkMessageString);
            message = chunkMessageString;
          } catch (e) {
            this._log.debug(`error = ${JSON.stringify(e)}`);
          }
          delete chunckSession[data.name];
          this._log.debug(`Chunk Message: ${JSON.stringify(receiveMessage)} - chunkFinised - ${chunkFinised}`);
        }
        if (bInChunkProcess) {
          console.log("Handle chunk message Chunk Message meta: " + JSON.stringify(receiveMessage.metadata) + " - chunkFinised -" + chunkFinised);
        }
        var dashboard = this.dashboards[receiveMessage.metadata.sessionId];
        if (dashboard != null) {
          var session = this._sessions.get(receiveMessage.metadata.sessionId);
          if (receiveMessage.metadata.clientId === "") {
            //No broadcast id _clientID ===""
            //this.dashboards[receiveMessage._sessionId].emit("message", message);
            //***
            //this._log.debug("PLUGIN : " + receiveMessage._pluginID + " message receive without clientId sent to dashboard for session id :" + receiveMessage._sessionId, { type: "PLUGIN", session: receiveMessage._sessionId });
          }
          else {
            //Send message if _clientID = clientID selected by dashboard
            if (session && receiveMessage.metadata.clientId === session.currentClientId) {
              dashboard.emit("message", message);
              this._log.debug(formatLog("PLUGIN", "PLUGIN=>DASHBOARD", receiveMessage));
            }
            else {
              this._log.error(formatLog("PLUGIN", "must be disconnected", receiveMessage));
            }
          }
        }
        else {
          this._log.error(formatLog("PLUGIN", "no dashboard found", receiveMessage));
        }
      });

      socket.on("clientclosed", (message: string) => {
        this._log.warn("CLIENT clientclosed " + message);
        var receiveMessage = <VorlonMessage>JSON.parse(message);
        this._sessions.all().forEach((session) => {
          for (var clientid in session.connectedClients) {
            var client = session.connectedClients[clientid];
            if (this.baseURLConfig.baseURL + "/client#" + receiveMessage.data.socketid === client.socket.id) {
              client.opened = false;
              if (this.dashboards[session.sessionId]) {
                this._log.debug(formatLog("PLUGIN", "Send RemoveClient to Dashboard " + socket.id, receiveMessage));
                this.dashboards[session.sessionId].emit("removeclient", client.data);
              } else {
                this._log.debug(formatLog("PLUGIN", "NOT sending RefreshClients, no Dashboard " + socket.id, receiveMessage));
              }
              this._log.debug(formatLog("PLUGIN", "Client Close " + socket.id, receiveMessage));
            }
          }
          this._sessions.update(session.sessionId, session);
        });
      });
    }

    public addDashboard(socket: SocketIO.Socket): void {
      socket.on("helo", (message: string) => {
        //this._log.warn("DASHBOARD helo " + message);
        var receiveMessage = <VorlonMessage>JSON.parse(message);
        var metadata = receiveMessage.metadata;
        var dashboard = this.dashboards[metadata.sessionId];

        if (dashboard == null) {
          this._log.debug(formatLog("DASHBOARD", "New Dashboard", receiveMessage));
        }
        else {
          this._log.debug(formatLog("DASHBOARD", "Reconnect", receiveMessage));
        }

        this.dashboards[metadata.sessionId] = socket;
        dashboard = socket;

        //if client listen by dashboard send helo to selected client
        if (metadata.listenClientId !== "") {
          this._log.debug(formatLog("DASHBOARD", "Client selected for :" + metadata.listenClientId, receiveMessage));
          var session = this._sessions.get(metadata.sessionId);
          if (session != undefined) {
            this._log.debug(formatLog("DASHBOARD", "Change currentClient " + metadata.clientId, receiveMessage));
            session.currentClientId = metadata.listenClientId;

            for (var clientId in session.connectedClients) {
              var client = session.connectedClients[clientId]
              if (client.clientId === metadata.listenClientId) {
                if (client.socket != null) {
                  this._log.debug(formatLog("DASHBOARD", "Send helo to socketid :" + client.socket.id, receiveMessage));
                  client.socket.emit("helo", metadata.listenClientId);
                }
              }
              else {
                this._log.debug(formatLog("DASHBOARD", "Wait for socketid (" + client.socket.id + ")", receiveMessage));
              }
            }

            //Send Helo to DashBoard
            this._log.debug(formatLog("DASHBOARD", "Send helo to Dashboard", receiveMessage));
            socket.emit("helo", metadata.listenClientId);
          }
        }
        else {
          this._log.debug(formatLog("DASHBOARD", "No client selected for this dashboard"));
          if (session != undefined) {
            this._sessions.update(metadata.sessionId, session);
          }
        }
      });

      socket.on("reload", (message: string) => {
        //this._log.warn("DASHBOARD reload " + message);
        var receiveMessage = <VorlonMessage>JSON.parse(message);
        var metadata = receiveMessage.metadata;

        //if client listen by dashboard send reload to selected client
        if (metadata.listenClientId !== "") {
          this._log.debug(formatLog("DASHBOARD", "Client selected for :" + metadata.listenClientId, receiveMessage));
          var session = this._sessions.get(metadata.sessionId);
          if (session != undefined) {
            this._log.debug(formatLog("DASHBOARD", "Change currentClient " + metadata.clientId, receiveMessage));
            session.currentClientId = metadata.listenClientId;

            for (var clientId in session.connectedClients) {
              var client = session.connectedClients[clientId]
              if (client.clientId === metadata.listenClientId) {
                if (client.socket != null) {
                  this._log.debug(formatLog("DASHBOARD", "Send reload to socketid :" + client.socket.id, receiveMessage));
                  client.socket.emit("reload", metadata.listenClientId);

                }
              }
              else {
                this._log.debug(formatLog("DASHBOARD", "Wait for socketid (" + client.socket.id + ")", receiveMessage));
              }
            }
          }
        }
        else {
          this._log.debug(formatLog("DASHBOARD", "No client selected for this dashboard"));
          if (session != undefined) {
            this._sessions.update(metadata.sessionId, session);
          }
        }
      });

      socket.on("protocol", (message: string) => {
        //this._log.warn("DASHBOARD protocol " + message);
        var receiveMessage = <VorlonMessage>JSON.parse(message);
        var metadata = receiveMessage.metadata;
        var dashboard = this.dashboards[metadata.sessionId];
        if (dashboard == null) {
          this._log.error(formatLog("DASHBOARD", "No Dashboard to send message", receiveMessage));
        }
        else {
          dashboard.emit("message", message);
          this._log.debug(formatLog("DASHBOARD", "Dashboard send message", receiveMessage));
        }
      });

      socket.on("identify", (message: string) => {
        this._log.warn("DASHBOARD identify " + message);
        var receiveMessage = <VorlonMessage>JSON.parse(message);
        var metadata = receiveMessage.metadata;
        this._log.debug(formatLog("DASHBOARD", "Identify clients", receiveMessage));
        var session = this._sessions.get(metadata.sessionId);

        if (session != null) {
          var nbClients = 0;
          const { data } = receiveMessage;

          if ( data.clientId ) {
            const targetClients = Object.keys(session.connectedClients).filter((key) => {
              return key == data.clientId;
            });

            if (targetClients.length > 0) {
              const targetClient = session.connectedClients[targetClients[0]];
              if (targetClient.opened && targetClient.clientId == data.clientId) {
                this._log.warn('finded target');
                targetClient.socket.emit("identify", targetClient.displayId);
              }
            }
          } else {

            for (var client in session.connectedClients) {
              var currentclient = session.connectedClients[client];
              if (currentclient.opened) {
                this._log.warn('find targetClients identify' + JSON.stringify(currentclient.data));
                currentclient.socket.emit("identify", currentclient.displayId);
                this._log.debug(formatLog("DASHBOARD", "Dashboard send identify " + currentclient.displayId + " to socketid : " + currentclient.socket.id, receiveMessage));
                nbClients++;
              }
            }
            this._log.debug(formatLog("DASHBOARD", "Send " + session.nbClients + " identify(s)", receiveMessage));

          }

        }
        else {
          this._log.error(formatLog("DASHBOARD", " No client to identify...", receiveMessage));
          if (session != undefined) {
            this._sessions.update(metadata.sessionId, session);
          }
        }
      });

      socket.on( 'closeclient', (message: string) => {
        this._log.warn("DASHBOARD closeclient " + message);
        const receiveMessage = <VorlonMessage>JSON.parse(message);
        this._sessions.all().forEach((session) => {
          for (const clientid in session.connectedClients) {
            const client = session.connectedClients[clientid];
            if (receiveMessage.data.clientid === client.clientId) {
              client.opened = false;
              if (this.dashboards[session.sessionId]) {
                this.dashboards[session.sessionId].emit("removeclient", client.data);
              }
            }
          }
          this._sessions.update(session.sessionId, session);
        });
      });

      socket.on("message", (message: string) => {
        this._log.warn("DASHBOARD message " + message);
        var receiveMessage = <VorlonMessage>JSON.parse(message);
        var metadata = receiveMessage.metadata;
        var arrayClients = this._sessions.get(metadata.sessionId);

        if (arrayClients != null) {
          for (var clientId in arrayClients.connectedClients) {
            var client = arrayClients.connectedClients[clientId];
            if (metadata.listenClientId === client.clientId) {
              client.socket.emit("message", message);
              this._log.debug(formatLog("DASHBOARD", "DASHBOARD=>PLUGIN", receiveMessage));
              //this._log.debug(formatLog("DASHBOARD", "Send to client socketid : " + client.socket.id, receiveMessage));
            }
          }
          //this._log.debug("DASHBOARD : " + metadata.sessionId + " Send " + (receiveMessage.command ? receiveMessage.command: "") + " to " + arrayClients.nbClients + " client(s)");
        }
        else {
          this._log.error(formatLog("DASHBOARD", "No client for message", receiveMessage));
          var session = this._sessions.get(metadata.sessionId);
          if (session != undefined) {
            this._sessions.update(metadata.sessionId, session);
          }
        }
      });

      socket.on("disconnect", (message: string) => {
        //Delete dashboard session
        this._log.warn("DASHBOARD disconnect " + message);
        for (var dashboard in this.dashboards) {
          if (this.dashboards[dashboard].id === socket.id) {
            delete this.dashboards[dashboard];
            this._log.debug(formatLog("DASHBOARD", "Delete dashboard " + dashboard + " socket " + socket.id));
          }
        }

        //Send disconnect to all client
        this._sessions.all().forEach((session) => {
          for (var client in session.connectedClients) {
            session.connectedClients[client].socket.emit("stoplisten");
          }
        });
      });
    }
  }

  export interface VorlonMessageMetadata {
    pluginID: string;
    side: number;
    sessionId: string;
    clientId: string;
    listenClientId: string;
  }

  export interface VorlonMessage {
    metadata: VorlonMessageMetadata;
    command?: string
    data?: any
    chunked?: any
  }

  function formatLog(type: string, message: string, vmessage?: VorlonMessage) {
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
            buffer.push(":" + vmessage.command)

          buffer.push(" ");
        }

        if (vmessage.metadata.clientId) {
          buffer.push(vmessage.metadata.clientId);
        }
      }
    }


    return buffer.join("");
  }

}
