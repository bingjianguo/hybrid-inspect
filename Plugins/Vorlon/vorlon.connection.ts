export class Connection {
    private static _CurrentListenClientId = '';
    private static _inRetry = false;

    public static get CurrentListenClientId(): string {
        return Connection._CurrentListenClientId;
    }

    public static set CurrentListenClientId( value: string ) {
        Connection._CurrentListenClientId = value;
    }

    public static get inRetry(): boolean {
        return Connection._inRetry
    }

    public static set inRetry( value : boolean) {
        Connection._inRetry = value
    }
}