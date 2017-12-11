import redis = require("redis");
import express = require("express");
import http = require("http");
import socketio = require("socket.io");
import fs = require("fs");
import path = require("path");
import util = require('util');
//Vorlon
import iwsc = require("./vorlon.IWebServerComponent");
import tools = require("./vorlon.tools");
import vorloncontext = require("../config/vorlon.servercontext");

import { DashBoardMessage } from './message/dashboard';
import { ClientMessage } from "./message/client";

export module VORLON {
  export class Server implements iwsc.VORLON.IWebServerComponent {
    private _sessions: vorloncontext.VORLON.SessionManager;
    public dashboards = new Array<SocketIO.Socket>();

    private _io: any;
    private _log: vorloncontext.VORLON.ILogger;
    private httpConfig: vorloncontext.VORLON.IHttpConfig;
    private pluginsConfig: vorloncontext.VORLON.IPluginsProvider;
    private baseURLConfig: vorloncontext.VORLON.IBaseURLConfig;
    

    private _dashboardMessage: any;
    private _clientMessage: any;

    constructor(context: vorloncontext.VORLON.IVorlonServerContext) {
      this.baseURLConfig = context.baseURLConfig;
      this.httpConfig = context.httpConfig;
      this.pluginsConfig = context.plugins;
      this._log = context.logger;
      this._sessions = context.sessions;
      

      this._clientMessage = new ClientMessage(this._sessions, this.dashboards, this._log, this.baseURLConfig);
      this._dashboardMessage = new DashBoardMessage(this._sessions, this.dashboards, this._log);
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
        javascriptFile += `var vorlonHostURL='${this.httpConfig.protocol}://${req.headers.host}${baseUrl}';\n`; 

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
     
          this._clientMessage.add(socket);
        });

      //Listen on /dashboard
      this._io
        .of(this.baseURLConfig.baseURL + "/dashboard")
        .on("connection", socket => {
          this._dashboardMessage.add(socket);
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
  }
}
