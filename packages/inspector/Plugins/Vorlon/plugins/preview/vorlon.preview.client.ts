
declare var VORLON: any;
const { Core, ClientPlugin } = VORLON;

const ready = function (callback) {
  ///兼容FF,Google
  if (document.addEventListener) {
    const func = () => {
      document.removeEventListener('DOMContentLoaded', func, false);
      callback();
    }
    document.addEventListener('DOMContentLoaded', func, false)
  }
  //兼容IE
  else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState == "complete") {
        document.detachEvent("onreadystatechange", arguments.callee);
        callback();
      }
    })
  }
  else if (document.lastChild == document.body) {
    callback();
  }
}

export class PreviewClient extends ClientPlugin {

  constructor() {
    super("preview"); // Name
    this._ready = true; // No need to wait
    console.log('Started');

  }

  //Return unique id for your plugin
  public getID(): string {
    return "PREVIEW";
  }

  public refresh(): void {
    //override this method with cleanup work that needs to happen
    //as the user switches between clients on the dashboard

    //we don't really need to do anything in this sample
  }

  // This code will run on the client //////////////////////

  // Start the clientside code
  public startClientSide(): void {
    //don't actually need to do anything at startup

    ready(() => {
      const headID = document.getElementsByTagName("head")[0];
      var jsNode = document.createElement('script');
      jsNode.type = "text/javascript";
      jsNode.src = `${window.vorlonHostURL}/javascripts/html2canvas.js` ;
      headID.appendChild(jsNode);
    })

  }

  // Handle messages from the dashboard, on the client
  public onRealtimeMessageReceivedFromDashboardSide(receivedObject: any): void {
    const html2canvas = require('html2canvas');
    const screen = {
      width: window.screen.width,
      height: window.screen.height
    };
    if (receivedObject.message == 'preview') {
        const width= document.body.clientWidth;   //准备截图div的宽
        const height= document.body.clientHeight;  //准备截图div的高
        const varscaleBy = 3;//缩放比例
        const allImages = document.getElementsByTagName('img');
        // 改变页面中img标签的src属性地址
        // for (let index = 0; index < allImages.length; index++ ) {
        //     const image = allImages[index];
        //     if ( image.src.indexOf('proxyToLocal') < 0 ) {
        //         image.src = `/proxyToLocal?url=${encodeURIComponent(image.src)}`;
        //     }
        // }
    
        const node = document.body; // document.getElementById('header'); 

        html2canvas(node,{
            useCORS: true,
            // allowTaint:true,
            onrendered: () => {

            },
          }).then((canvas) => {
            canvas.id="mycanvas";
            // document.body.appendChild(canvas);
            //生成base64图片数据
            var dataUrl= canvas.toDataURL('image/png');
            
            // document.execCommand("dataUrl");
            // var newImg=document.createElement("img");
            // newImg.crossOrigin="anonymous";//关键
            // newImg.src=dataUrl;
            
            this.sendToDashboard({data: { dataUrl,  screen }, message: 'preview'});
        }).catch((error) => {
          this.sendToDashboard({data: { error, dataUrl: '', screen }, message: 'preview'});
        });
      
    } else if ( receivedObject.message === 'previewByIframe') {
      let html = document.getElementsByTagName('html')[0].outerHTML;
      function stripscript(s) {  
        // return s.replace(/<script.*?>.*?<\/script>/ig, '');  
        return s.replace(/<script(([\s\S])*?)<\/script>/ig, '');  
      } 

      html = stripscript(html);
      this.sendToDashboard({data: { html, screen }, message: 'previewByIframe'});
    }
  }
}

//Register the plugin with vorlon core
Core.RegisterClientPlugin(new PreviewClient());