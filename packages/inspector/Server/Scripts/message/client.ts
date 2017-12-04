import { VorlonMessage, formatLog } from './interface';
import * as vorloncontext from "../../config/vorlon.servercontext";


export class ClientMessage {
  private _sessions: vorloncontext.VORLON.SessionManager;
  public dashboards: Array<SocketIO.Socket>;
  private _log: vorloncontext.VORLON.ILogger;
  private baseURLConfig: vorloncontext.VORLON.IBaseURLConfig;
  
  private _mapChunkMessage: any;
  private _sessionId: string;// 当前的client所在的sessionid

  constructor(_sessions, dashboards, _log, baseURLConfig) {
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
  private _startHeart(client: vorloncontext.VORLON.Client): void {
    ((id) => {
      let bInQuering = true;
      const queryHeart = () => {
        
        bInQuering = true;
        setTimeout(() => {
          if ( !client.opened ) {
            this._log.warn('in heart when the client open set to false');
            return;
          }
          if (client.socket.id != id) {
            return;
          }
          // dashboard会在切换客户端的时候发生变化,所以每次要重新获取
          const dashboard = this.dashboards[this._sessionId];
          if ( bInQuering ) {
            // 设置client的状态为心跳失败
            // 在这儿给dashboard发送消息，设置显示状态
            client.heart = false;
            dashboard && dashboard.emit("heart", client.data);
          } else {
            // 设置client的状态为心跳成功
            // 在这儿给dashboard发送消息，设置显示状态
            client.heart = true;
            dashboard && dashboard.emit("heart", client.data);
            
          }
          this._log.warn(`in heart query heart ${client.heart} client title = ${client.title}`);
          queryHeart();
        },6000);
      };
      client.socket.on('heart', () => {
        this._log.warn(`in heart feedback call`);
        bInQuering = false;
      });
  
      queryHeart();
    })(client.socket.id);
  }

  /**
   * 
   * @param socket 
   * @param message 
   */
  private onHelo(socket: SocketIO.Socket, message: string): void {
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
    this._sessionId = metadata.sessionId;
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
  }

  /**
   * 
   * @param socket 
   * @param message 
   */
  private onMessage(socket: SocketIO.Socket, message: string): void {
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
  }

  /**
   * 
   * @param socket 
   * @param message 
   */
  private onClientClosed(socket: SocketIO.Socket, message: string): void {
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
  }

  public add(socket: SocketIO.Socket): void {
    this._log.warn('------------------------------------add client-----------------')
    socket.on("helo", this.onHelo.bind(this, socket));

    socket.on("message", this.onMessage.bind(this, socket));

    socket.on("clientclosed", this.onClientClosed.bind(this, socket));
  }
  
}