import { VorlonMessage, formatLog } from './interface';
import vorloncontext = require("../../config/vorlon.servercontext");

export class DashBoardMessage {

  private _sessions: vorloncontext.VORLON.SessionManager;
  public dashboards: Array<SocketIO.Socket>;
  private _log: vorloncontext.VORLON.ILogger;

  constructor(_sessions, dashboards, _log) {
    this._sessions = _sessions;
    this.dashboards = dashboards;
    this._log = _log;
  }

  private onHelo(socket: SocketIO.Socket, message: string): void {
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
  }

  /**
   * 
   * @param socket 
   * @param message 
   */
  private onReload(socket: SocketIO.Socket, message: string): void {
      //this._log.warn("DASHBOARD reload " + message);
      var receiveMessage = <VorlonMessage>JSON.parse(message);
      var metadata = receiveMessage.metadata;
      this._log.warn('in onReload');
      //if client listen by dashboard send reload to selected client
      if (metadata.listenClientId !== "") {
        const session = this._sessions.get(metadata.sessionId);
        if (session != undefined) {
          session.currentClientId = metadata.listenClientId;

          for (var clientId in session.connectedClients) {
            var client = session.connectedClients[clientId]
            if (client.clientId === metadata.listenClientId) {
              if (client.socket != null) {
                client.socket.emit("reload", metadata.listenClientId);
              }
            }
            else {
              this._log.debug(formatLog("DASHBOARD", "Wait for socketid (" + client.socket.id + ")", receiveMessage));
            }
          }
        }
      } else {
        
        if (session != undefined) {
          this._sessions.update(metadata.sessionId, session);
        }
      }
  }

  /**
   * 
   * @param socket 
   * @param message 
   */
  private onProtocol(socket: SocketIO.Socket, message: string): void {
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
  }

  /**
   * 
   * @param socket 
   * @param message 
   */
  private onIdentify(socket: SocketIO.Socket, message: string): void {
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
  }
  /**
   * 
   * @param socket 
   * @param message 
   */
  private onCloseClient(socket: SocketIO.Socket, message: string): void {
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
  }

  /**
   * 
   * @param socket 
   * @param message 
   */
  private onMessage(socket: SocketIO.Socket, message: string): void {

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
  }

  /**
   * 
   * @param socket 
   * @param message 
   */
  private onDisconnect(socket: SocketIO.Socket, message: string): void {

      //Delete dashboard session
      // this._log.warn("DASHBOARD disconnect " + message);
      for (var dashboard in this.dashboards) {
        if (this.dashboards[dashboard].id === socket.id) {
          delete this.dashboards[dashboard];
          this._log.debug(formatLog("DASHBOARD", "Delete dashboard " + dashboard + " socket " + socket.id));
        }
      }

      //Send disconnect to all client
      this._sessions.all().forEach((session) => {
        // 页面的clint切换后，会清除当前dashboard的所有侦听信息
        for (var client in session.connectedClients) {
          session.connectedClients[client].socket.emit("stoplisten");
        }
      });
  }

  public add(socket: SocketIO.Socket): void {
    socket.on("helo", this.onHelo.bind(this, socket));

    socket.on("reload", this.onReload.bind(this, socket));

    socket.on("protocol", this.onProtocol.bind(this, socket));

    socket.on("identify", this.onIdentify.bind(this, socket));

    socket.on('closeclient', this.onCloseClient.bind(this, socket));

    socket.on("message", this.onMessage.bind(this, socket));

    socket.on("disconnect", this.onDisconnect.bind(this, socket));
  }
} 