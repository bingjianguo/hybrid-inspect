import React from 'react';
import Style from './DynamicIFrame.less';

const $ = window.$;
const DocumentWriter = {

  write : function ( PADocument, $ele ) {
    if ( PADocument ) {
      PADocument.open();
      PADocument.write( this.docType() + "<html>" + this.getHead() + this.getBody( $ele ) + "</html>" );
      PADocument.close();
    }

  },

  docType : function() {
    if ( settings.mode == modes.iframe ) return "";

    if ( settings.standard == standards.html5 ) return "<!DOCTYPE html>";

    var transitional = settings.standard == standards.loose ? " Transitional" : "";
    var dtd = settings.standard == standards.loose ? "loose" : "strict";

    return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01' + transitional + '//EN" "http://www.w3.org/TR/html4/' + dtd +  '.dtd">';
  },
  getHead : function() {
    var extraHead = "";
    var links = "";

    if ( settings.extraHead ) settings.extraHead.replace( /([^,]+)/g, function(m){ extraHead += m });

    $(document).find("link")
      .filter(function(){ // Requirement: <link> element MUST have rel="stylesheet" to be considered in print document
        var relAttr = $(this).attr("rel");
        return ($.type(relAttr) === 'undefined') == false && relAttr.toLowerCase() == 'stylesheet';
      })
      .filter(function(){ // Include if media is undefined, empty, print or all
        var mediaAttr = $(this).attr("media");
        return $.type(mediaAttr) === 'undefined' || mediaAttr == "" || mediaAttr.toLowerCase() == 'print' || mediaAttr.toLowerCase() == 'all'
      })
      .each(function(){
        links += '<link type="text/css" rel="stylesheet" href="' + $(this).attr("href") + '" >';
      });
    if ( settings.extraCss ) settings.extraCss.replace( /([^,\s]+)/g, function(m){ links += '<link type="text/css" rel="stylesheet" href="' + m + '">' });

    return "<head><title>" + settings.popTitle + "</title>" + extraHead + links + "</head>";
  },
  getBody : function ( elements ) {
    var htm = "";
    var attrs = settings.retainAttr;
    elements.each(function() {
      var ele = PrintArea.getFormData( $(this) );

      var attributes = ""
      for ( var x = 0; x < attrs.length; x++ )
      {
        var eleAttr = $(ele).attr( attrs[x] );
        if ( eleAttr ) attributes += (attributes.length > 0 ? " ":"") + attrs[x] + "='" + eleAttr + "'";
      }

      htm += '<div ' + attributes + '>' + $(ele).html() + '</div>';
    });

    const script = this.getAutoPrintScript();
    const printButton = this.getPrintButton();

    return "<body>" + htm + (/msie/i.test(navigator.userAgent) ? script : '')  + printButton + "</body>";
  },
}

class DynamicIFrame extends React.PureComponent {


  refreshContent () {
    const iframe = this.iframe;
    const { html } = this.props;
    function originLogic() {
      $(iframe).attr({ id: 'frameId', src: "#" + new Date().getTime() });
      iframe.doc = null;
      iframe.doc = iframe.contentDocument ? iframe.contentDocument : ( iframe.contentWindow ? iframe.contentWindow.document : iframe.document);

      const { doc } = iframe;
      doc.open();
      doc.write(html);
      doc.close();
    }

    if(/msie/i.test(navigator.userAgent)){
      iframe.onload = function() {
        console.log(iframe.contentWindow.document.location);
        iframe.onload = null;
        originLogic();
      }
      iframe.src = "javascript:void((function(){document.open();document.domain='"+ document.domain + "';document.close()})())";

    } else {
      originLogic();
    }
  }

  componentDidMount () {
    this.refreshContent();
    $(this.iframe).on('load', () => {
      const scrollHeight = this.iframe.contentDocument.documentElement.scrollHeight
      $(this.iframe).height(scrollHeight);
    })
  }

  componentDidUpdate () {
    this.refreshContent();
  }

  render () {
    const { containerStyle } = this.props;
    return (
      <div
        className={Style.previewWrapper} 
        style={{ height: containerStyle['height']}}
      >
        <iframe 
          scrolling="no"
          className={Style.main}
          ref={ele => this.iframe=ele}
        />
        <div 
          style={containerStyle}
        >
        </div>
      </div>

    )
  }
}

export default DynamicIFrame;