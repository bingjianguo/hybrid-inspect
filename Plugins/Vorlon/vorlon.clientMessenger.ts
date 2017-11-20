import { RuntimeSide } from './vorlon.enums';
import { Core } from './vorlon.core';
import { Connection } from './vorlon.connection';

import Socket = SocketIO.Socket;
declare var io;

export interface VorlonMessageMetadata {
    pluginID : string;
    side : RuntimeSide;
    sessionId : string;
    clientId: string;
    listenClientId: string;
}

export interface VorlonMessage {
    metadata: VorlonMessageMetadata;
    command?: string;
    data? : any
}

export class ClientMessenger {
    private _socket: any;
    private _isConnected = false;
    private _sessionId: string;
    private _clientId: string;
    private _listenClientId: string;
    private _serverUrl: string;
    private _side: any;
    private _options: any;

    public onRealtimeMessageReceived: (message: VorlonMessage) => void;
    public onHeloReceived: (id: string) => void;
    public onIdentifyReceived: (id: string) => void;
    public onRemoveClient: (id: any) => void;
    public onAddClient: (id: any) => void;
    public onStopListenReceived: () => void;
    public onRefreshClients: () => void;
    public onReload: (id: string) => void;
    public onError: (err: Error) => void;

    public get isConnected(): boolean {
        return this._isConnected;
    }

    public set clientId(value: string) {
        this._clientId = value;
    }

    public get socketId(): string {
        return this._socket.id;
    }

    /**
     * 抽离创建websocket连接的的公共功能代码，为断线重连
     */
    generateConnection() {
        const side = this._side;
        const serverUrl = this._serverUrl;
        const options = this._options;
        switch (side) {
            case RuntimeSide.Client:
                this._socket = io.connect(serverUrl + "/client", options);
                this._isConnected = true;
                break;
            case RuntimeSide.Dashboard:
                this._socket = io.connect(serverUrl + "/dashboard", options);
                this._isConnected = true;
                break;
        }
        // this._socket.binaryType = 'blob';

        if (this.isConnected) {
            var manager = io.Manager(serverUrl, options);
            manager.on('connect_error',(err) => {
                if (this.onError) {
                    this.onError(err);
                }
            });

            this._socket.on('message', message => {
                var received = <VorlonMessage>JSON.parse(message);

                if (this.onRealtimeMessageReceived) {
                    this.onRealtimeMessageReceived(received);
                }
            });

            this._socket.on('helo', message => {
                Core._listenClientId = message;
                if (this.onHeloReceived) {
                    this.onHeloReceived(message);
                }
            });

            this._socket.on('identify', message => {
                if (this.onIdentifyReceived) {
                    this.onIdentifyReceived(message);
                }
            });

            this._socket.on('stoplisten',() => {
                if (this.onStopListenReceived) {
                    this.onStopListenReceived();
                }
            });

            this._socket.on('refreshclients',() => {
                if (this.onRefreshClients) {
                    this.onRefreshClients();
                }
            });

            this._socket.on('addclient', client => {
                if (this.onAddClient) {
                    this.onAddClient(client);
                }
            });

            this._socket.on('removeclient', client => {
                if (this.onRemoveClient) {
                    this.onRemoveClient(client);
                }
            });

            this._socket.on('reload', message => {
                Core._listenClientId = message;
                if (this.onReload) {
                    this.onReload(message);
                }
            });
        }
    }

    constructor(side: RuntimeSide, serverUrl: string, sessionId: string, clientId: string, listenClientId: string) {
        this._side = side;
        this._isConnected = false;
        this._sessionId = sessionId;
        this._clientId = clientId;
        Core._listenClientId = listenClientId;
        this._serverUrl = serverUrl;

        var options = {
            "path": serverUrl.replace(/h.*:\/\/[^\/]*/, "") + "/socket.io"
        };
        var ua = navigator.userAgent;
        if (ua.indexOf('Nebula WK') >= 0) {
            options['transports'] = ['websocket'];
        }
        this._options = options;
        this.generateConnection();
    }

    /**
     * 重新初始化_socket 对象
     */
    public retryConnect(): void {
        Connection.CurrentListenClientId = Core._listenClientId;
        this.stopListening();

        this.generateConnection();
        // 重新将本次建联的websocket注册到dashboard列表中
        Core.sendHelo();
    }

    public stopListening(): void{
        if(this._socket){
            this._socket.removeAllListeners();
        }
    }

    public sendRealtimeMessage(pluginID: string, objectToSend: any, side: RuntimeSide, messageType = "message", command?:string): void {
        var message: VorlonMessage = {
            metadata: {
                pluginID: pluginID,
                side: side,
                sessionId: this._sessionId,
                clientId: this._clientId,
                listenClientId: Core._listenClientId
            },
            data: objectToSend
        };

        if (command)
            message.command = command;

        if (!this.isConnected) {
            // Directly raise response locally
            if (this.onRealtimeMessageReceived) {
                this.onRealtimeMessageReceived(message);
            }
            return;
        } else {
            if (Core._listenClientId !== "" || messageType !== "message") {
                const strmessage = JSON.stringify(message);
                this._socket.emit(messageType, strmessage);


                // var chunk = 5000, maxSize = 10000;


                // if ( false && strmessage.length > maxSize) {
                //     // 拆成多个message发送
                //     // 大的包不发, 临时方案
                //     if ( message.metadata ) {
                //         var sendByRecursive = ((message, strmessage) => {
                //             var total = Math.ceil(strmessage.length / chunk);
                //             var messageName = +new Date();
                //             var iIndex = 0;
                //             var r = () => {
                //                 if (iIndex>=total)
                //                     return;
                //
                //                 var newMessage = {
                //                     metadata: message.metadata,
                //                     data: {
                //                         content: strmessage.substr(iIndex* chunk, chunk),
                //                         index: iIndex,
                //                         total: total,
                //                         name: messageName
                //                     },
                //                     chunked: true
                //                 };
                //                 var strNewMessage = JSON.stringify(newMessage);
                //                 this._socket.emit(messageType, strNewMessage);
                //                 setTimeout(()=>{
                //                     iIndex++;
                //                     r();
                //                 },10);
                //             };
                //
                //             return r;
                //         })(message, strmessage);
                //         sendByRecursive();
                //     }
                // } else {
                //
                // }


            }
        }
    }

    public sendMonitoringMessage(pluginID: string, message: string): void {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                }
            }
        }

        xhr.open("POST", this._serverUrl + "api/push");
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        var data = JSON.stringify({ "_idsession": this._sessionId, "id": pluginID, "message": message });
        //xhr.setRequestHeader("Content-length", data.length.toString());
        xhr.send(data);
    }

    public getMonitoringMessage(pluginID: string, onMonitoringMessage: (messages: string[]) => any, from = "-20", to = "-1"): any {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (onMonitoringMessage)
                        onMonitoringMessage(<string[]>JSON.parse(xhr.responseText));
                } else {
                    if (onMonitoringMessage)
                        onMonitoringMessage(null);
                }
            } else {
                if (onMonitoringMessage)
                    onMonitoringMessage(null);
            }
        };

        xhr.open("GET", this._serverUrl + "api/range/" + this._sessionId + "/" + pluginID + "/" + from + "/" + to);
        xhr.send();

    }
}
