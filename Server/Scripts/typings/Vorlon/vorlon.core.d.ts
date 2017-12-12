import { ClientPlugin } from './vorlon.clientPlugin';
import { DashboardPlugin } from './vorlon.DashboardPlugin';
import { ClientMessenger } from './vorlon.clientMessenger';
import { RuntimeSide } from './vorlon.enums';
export declare class _Core {
    _clientPlugins: ClientPlugin[];
    _dashboardPlugins: DashboardPlugin[];
    _messenger: ClientMessenger;
    _sessionID: string;
    _listenClientId: string;
    _side: RuntimeSide;
    _errorNotifier: any;
    _messageNotifier: any;
    _socketIOWaitCount: number;
    debug: boolean;
    _RetryTimeout: number;
    _isHttpsEnabled: boolean;
    Messenger: ClientMessenger;
    ClientPlugins: Array<ClientPlugin>;
    IsHttpsEnabled: boolean;
    DashboardPlugins: Array<DashboardPlugin>;
    RegisterClientPlugin(plugin: ClientPlugin): void;
    RegisterDashboardPlugin(plugin: DashboardPlugin): void;
    StopListening(): void;
    StartClientSide(serverUrl?: string, sessionId?: string, listenClientId?: string): void;
    sendHelo(): void;
    startClientDirtyCheck(): void;
    StartDashboardSide(serverUrl?: string, sessionId?: string, listenClientId?: string, divMapper?: (string) => HTMLDivElement): void;
    /**
     * retryConnect考虑复用当前的_listenClientId逻辑
     * 刷新后有socket.io事件冒泡过来的清除_listenClientId的事件回调
     * @private
     */
    private _OnStopListenReceived();
    private _OnIdentifyReceived(message);
    private ShowError(message, timeout?);
    private _OnError(err);
    private _OnIdentificationReceived(id);
    private _OnReloadClient(id);
    private _RetrySendingRealtimeMessage(plugin, message);
    private _Dispatch(message);
    private _DispatchPluginMessage(plugin, message);
    private _DispatchFromClientPluginMessage(plugin, message);
    private _DispatchFromDashboardPluginMessage(plugin, message);
}
export declare var Core: _Core;
