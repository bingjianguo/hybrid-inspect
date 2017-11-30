declare var VORLON: any;
declare var ReactDOM: any;
declare var React: any;

import Preview from './components/Index';


const { Core, DashboardPlugin } = VORLON;

export class PreviewDashboard extends DashboardPlugin {

  //Do any setup you need, call super to configure
  //the plugin with html and css for the dashboard
  constructor() {
    //     name   ,  html for dash   css for dash
    super('preview', 'control.html', ['vorlon.preview.dashboard.css']);
    this._ready = true;
    console.log('Started');
  }

  //Return unique id for your plugin
  public getID(): string {
    return "PREVIEW";
  }

  // This code will run on the dashboard //////////////////////

  // Start dashboard code
  // uses _insertHtmlContentAsync to insert the control.html content
  // into the dashboard
  private _inputField: HTMLInputElement
  private _outputDiv: HTMLElement

  public startDashboardSide(div: HTMLDivElement = null): void {

    this._insertHtmlContentAsync(div, (filledDiv) => {
      this.root = ReactDOM.render(
        <Preview />, 
        div
      );
    })
  }

  // When we get a message from the client, just show it
  public onRealtimeMessageReceivedFromClientSide(receivedObject: any): void {
    
    if (receivedObject.message == 'preview') {
      const { data } = receivedObject;
      const { dataUrl, screen } = data;
      this.root.externalSetProps({
        dataUrl: dataUrl,
        screen
      })
    }
  }
}

//Register the plugin with vorlon core
Core.RegisterDashboardPlugin(new PreviewDashboard());