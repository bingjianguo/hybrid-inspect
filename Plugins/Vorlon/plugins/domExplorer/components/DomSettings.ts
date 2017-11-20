declare var VORLON: any;
const { Tools, Core } = VORLON;


export default class DomSettings {
  private _plugin: DOMExplorerDashboard;
  private _globalload: HTMLInputElement;
  private _autorefresh: HTMLInputElement;
  constructor(plugin: DOMExplorerDashboard) {
    this._plugin = plugin;
    this.setSettings(this._plugin.getContainerDiv());
  }

  private setSettings(filledDiv: HTMLElement) {
    this._globalload = <HTMLInputElement> Tools.QuerySelectorById(filledDiv, "globalload");
    this._autorefresh = <HTMLInputElement> Tools.QuerySelectorById(filledDiv, "autorefresh");
    this.loadSettings();
    this.refreshClient();
    $(this._autorefresh).change(() => {
      this.saveSettings();
    });
    $(this._globalload).change(() => {
      this.saveSettings();
    });
  }
  public refreshClient() {
    this._plugin.sendCommandToClient('setSettings', { globalload: this._globalload.checked, autoRefresh: this._autorefresh.checked });
  }
  private loadSettings() {
    var stringSettings = Tools.getLocalStorageValue("settings" + Core._sessionID);
    if (this._autorefresh && this._globalload && stringSettings) {
      var settings = JSON.parse(stringSettings);
      if (settings) {
        $(this._globalload).switchButton({ checked: settings.globalload });
        $(this._autorefresh).switchButton({ checked: settings.autorefresh });
        if (settings.globalload)
          this._plugin.sendCommandToClient('globalload', { value: true });
        this._plugin.setAutorefresh(this._autorefresh.checked);
        return;
      }
    }
    $(this._globalload).switchButton({ checked: false });
    $(this._autorefresh).switchButton({ checked: false });
    this._plugin.setAutorefresh(this._autorefresh.checked);
  }
  private saveSettings() {
    this.refreshClient();
    this._plugin.setAutorefresh(this._autorefresh.checked);
    Tools.setLocalStorageValue("settings" + Core._sessionID, JSON.stringify({
      "globalload": this._globalload.checked,
      "autorefresh": this._autorefresh.checked,
    }));
  }
}
