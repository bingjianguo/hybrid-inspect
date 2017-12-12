declare var vorlonBaseURL: string;
declare var VORLON: any;
declare var $: any;
declare var React: any;
declare var ReactDOM: any;

import 'antd/dist/antd.css';
import DashBoard from '../components/DashBoard';


class DashboardManager {
    static CatalogUrl: string;
    static vorlonBaseURL: string;
    static ListenClientid: string;
    static DisplayingClient: boolean;
    static ListenClientDisplayid: string;
    static SessionId: string;
    static ClientList: any;
    static PluginsLoaded: boolean;
    static NoWindowMode: boolean;
    static pageElement: any;

    constructor(sessionid: string, listenClientid: string) {
        DashboardManager.Initialize(sessionid, listenClientid);
        ReactDOM.render(
            <DashBoard />,
            document.getElementById('root')
        );
    }

    public static Initialize( sessionid: string, listenClientid: string ) {
        //Dashboard session id
        DashboardManager.SessionId = sessionid;
        DashboardManager.PluginsLoaded = false;
        DashboardManager.DisplayingClient = false;
        DashboardManager.vorlonBaseURL = vorlonBaseURL;
        //Client ID
        DashboardManager.ListenClientid = listenClientid;
        DashboardManager.ClientList = {};
        DashboardManager.StartListeningServer();
        DashboardManager.GetClients();
        DashboardManager.CatalogUrl =  vorlonBaseURL + "/getplugins/" + sessionid;
    }

    public static StartListeningServer(clientid: string = ""): void{
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host;

        if(DashboardManager.vorlonBaseURL) {
            baseUrl = DashboardManager.vorlonBaseURL.split('//')[0] === getUrl.protocol ? DashboardManager.vorlonBaseURL : baseUrl + DashboardManager.vorlonBaseURL;
        }

        VORLON.Core.StopListening();
        VORLON.Core.StartDashboardSide(baseUrl, DashboardManager.SessionId, clientid, DashboardManager.divMapper);
        if(!VORLON.Core.Messenger.onAddClient && !VORLON.Core.Messenger.onAddClient){
            VORLON.Core.Messenger.onAddClient = DashboardManager.addClient;
            VORLON.Core.Messenger.onRemoveClient = DashboardManager.removeClient;
        }

        if(clientid !== ""){
            DashboardManager.DisplayingClient = true;
        }
        else {
            DashboardManager.DisplayingClient = false;
        }
    }

    /**
     * 在DashBoard内部进行数据初始化的入口
     * 需要传递参数给React View层
     * @param client
     */
    public static GetClients(): void {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    //Init ClientList Object
                    DashboardManager.ClientList = {};
                    //Loading client list
                    var clients = JSON.parse(xhr.responseText);
                    $(window).trigger('DashBoard.GetClients', [clients]);

                }
            }
        }

        xhr.open("GET", vorlonBaseURL + "/api/getclients/" + DashboardManager.SessionId);
        xhr.send();
    }

    /**
     * 采用React渲染后，相关的页面dom操作流程可以去掉了
     * To Be Delete
     * @param client
     * @constructor
     */
    public static AddClientToList(client: any){
        DashboardManager.ClientList[client.clientid] = client;
    }

    static ClientCount(): number{
        return Object.keys(DashboardManager.ClientList).length;
    }

    static UpdateClientInfo(): void {
        document.querySelector('[data-hook~=session-id]').textContent = DashboardManager.SessionId;

        if(DashboardManager.ClientList[DashboardManager.ListenClientid] != null){
            DashboardManager.ListenClientDisplayid = DashboardManager.ClientList[DashboardManager.ListenClientid].displayid;
            DashboardManager.NoWindowMode = DashboardManager.ClientList[DashboardManager.ListenClientid].noWindow;
        }

        document.querySelector('[data-hook~=client-id]').textContent = DashboardManager.ListenClientDisplayid;
    }

    static HideWaitingLogo(): void {
        //Stop bouncing and hide waiting page
        var elt = document.querySelector('.dashboard-plugins-overlay');
        VORLON.Tools.AddClass(elt, 'hidden');

        elt = document.querySelector('.waitLoader');
        VORLON.Tools.AddClass(elt, 'hidden');

        elt = document.getElementById('reload');
        VORLON.Tools.RemoveClass(elt, 'hidden');
    }

    static DisplayWaitingLogo(displayWaiter: boolean): void{
        //Hide waiting page and let's not bounce the logo !
        var elt = document.querySelector('.dashboard-plugins-overlay');
        if(elt) {
            VORLON.Tools.RemoveClass(elt, 'hidden');
            if (displayWaiter) {
                elt = document.querySelector('.waitLoader');
                VORLON.Tools.RemoveClass(elt, 'hidden');
            }
            elt = document.getElementById('reload');
            VORLON.Tools.AddClass(elt, 'hidden');
        }
    }

    public static loadPlugins(): void {
        if(DashboardManager.ListenClientid === ""){
            return;
        }

        if(this.PluginsLoaded){
            DashboardManager.StartListeningServer(DashboardManager.ListenClientid);
            return;
        }

        let xhr = new XMLHttpRequest();
        let divPluginsBottom = document.getElementById("pluginsPaneBottom");
        let divPluginsTop = document.getElementById("pluginsPaneTop");
        let divPluginBottomTabs = document.getElementById("pluginsListPaneBottom");
        let divPluginTopTabs = document.getElementById("pluginsListPaneTop");
        let coreLoaded = false;

        //Hide waiting page and let's bounce the logo !
        DashboardManager.DisplayWaitingLogo(true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var catalog;
                    try {
                        catalog = JSON.parse(xhr.responseText);
                    } catch (ex) {
                        throw new Error("The catalog JSON is not well-formed");
                    }
                    // DashboardManager.UpdateClientInfo();

                    $(window).trigger('DashBoard.loadPlugins', [catalog]);
                }
            }
        }

        xhr.open("GET", DashboardManager.CatalogUrl);
        xhr.send();
    }

    public static divMapper(pluginId: string): HTMLDivElement {
        let divId = pluginId + "div";
        return (
            document.getElementById(divId)
            ||
            document.querySelector(`[data-plugin=${pluginId}]`)
        );
    }

    public identify(): void {
        VORLON.Core.Messenger.sendRealtimeMessage(
            "",
            { "_sessionid": DashboardManager.SessionId },
            VORLON.RuntimeSide.Dashboard,
            "identify"
        );
    }

    public static Identify( client: any): void {
        VORLON.Core.Messenger.sendRealtimeMessage(
            "",
            {
                "_sessionid": DashboardManager.SessionId,
                'clientId': client.clientid
            },
            VORLON.RuntimeSide.Dashboard,
            "identify"
        );
    }

    public static goConfig(): void {
        location.href = DashboardManager.vorlonBaseURL + '/config';
    }

    public static ResetDashboard(reload: boolean = true): void {
        let sessionid = DashboardManager.SessionId;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (reload) {
                        location.reload();
                    }
                }
            }
        }

        xhr.open("GET", vorlonBaseURL + "/api/reset/" + sessionid);
        xhr.send();
    }

    public static ReloadClient(): void {
        VORLON.Core.Messenger.sendRealtimeMessage("", DashboardManager.ListenClientid, VORLON.RuntimeSide.Dashboard, "reload");
    }

    /**
     * 与外界模块进行数据交换的入口
     * 需要传递参数给React View层
     * @param client
     */
    public static addClient(client: any): void {
        $(window).trigger('DashBoard.addClient',[client]);
        DashboardManager.AddClientToList(client);
        if(!DashboardManager.DisplayingClient){
            DashboardManager.loadPlugins();
        }
    }

    /**
     * 通过dashboard主动删除
     * @param client
     */
    public static removeClientByOperator( client: any ): void {
        VORLON.Core.Messenger.sendRealtimeMessage(
            '',
            { clientid: client.clientid},
            VORLON.RuntimeSide.Dashboard,
            'closeclient'
        );

        DashboardManager.removeInClientList(client);
    }

    /**
     * 会作为clientplugin中主动退出的客户端的，回调步骤执行
     * @param client
     */
    public static removeClient(client: any): void {

        // Todo: 在这里增加个提示，告诉用户，客户端已经失去连接了
        if(client.clientid === DashboardManager.ListenClientid){
            DashboardManager.ListenClientid = "";
            DashboardManager.StartListeningServer();
            // DashboardManager.DisplayWaitingLogo(false);
        }

        DashboardManager.removeInClientList(client);

        if (DashboardManager.ClientCount() === 0) {
            DashboardManager.ResetDashboard(false);
            // DashboardManager.DisplayingClient = false;
        }
    }

    public static removeInClientList(client: any): void{
        if(DashboardManager.ClientList[client.clientid] != null){
            delete DashboardManager.ClientList[client.clientid];
            $(window).trigger('DashBoard.removeClient',[client]);
        }
    }

    public static getSessionId(): void {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var sessionId = xhr.responseText;
                    window.location.assign(vorlonBaseURL + "/dashboard/" + sessionId);
                }
            }
        }

        xhr.open("GET", vorlonBaseURL + "/api/createsession");
        xhr.send();
    }
}

VORLON.DashboardManager = DashboardManager;