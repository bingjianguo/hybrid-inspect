import { RuntimeSide } from './vorlon.enums';
export interface VorlonMessageMetadata {
    pluginID: string;
    side: RuntimeSide;
    sessionId: string;
    clientId: string;
    listenClientId: string;
}
export interface VorlonMessage {
    metadata: VorlonMessageMetadata;
    command?: string;
    data?: any;
}
export declare class ClientMessenger {
    private _socket;
    private _isConnected;
    private _sessionId;
    private _clientId;
    private _listenClientId;
    private _serverUrl;
    private _side;
    private _options;
    onRealtimeMessageReceived: (message: VorlonMessage) => void;
    onHeloReceived: (id: string) => void;
    onIdentifyReceived: (id: string) => void;
    onRemoveClient: (id: any) => void;
    onAddClient: (id: any) => void;
    onStopListenReceived: () => void;
    onRefreshClients: () => void;
    onReload: (id: string) => void;
    onError: (err: Error) => void;
    isConnected: boolean;
    clientId: string;
    socketId: string;
    /**
     * 抽离创建websocket连接的的公共功能代码，为断线重连
     */
    generateConnection(): void;
    constructor(side: RuntimeSide, serverUrl: string, sessionId: string, clientId: string, listenClientId: string);
    /**
     * 重新初始化_socket 对象
     */
    retryConnect(): void;
    stopListening(): void;
    sendRealtimeMessage(pluginID: string, objectToSend: any, side: RuntimeSide, messageType?: string, command?: string): void;
    sendMonitoringMessage(pluginID: string, message: string): void;
    getMonitoringMessage(pluginID: string, onMonitoringMessage: (messages: string[]) => any, from?: string, to?: string): any;
}
