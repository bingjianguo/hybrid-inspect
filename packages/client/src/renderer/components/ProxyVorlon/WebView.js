import React from 'react';
import Styles from './WebView.less';

class WebView extends React.Component {

  constructor ( props ) {
    super(props);
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { url: nextUrl } = nextProps;
    const { url } = this.props;

    if ( url != nextUrl ) {
      return true;
    }
    return false;
  }

  /**
   *

        <div style={{height: '100%'}} dangerouslySetInnerHTML={{
        __html: `<webview src=${url} style="height:99%" class="${Styles.iframeContainer}"></webview>`
      }} />
   *
   */
  render () {
    const { url, height, id='' } = this.props;

    return (
      <iframe
        className={Styles.iframeContainer}
        style={{height: '100%'}}
        id={id}
        src={url}
      />
    )
  }
}

export default WebView;
