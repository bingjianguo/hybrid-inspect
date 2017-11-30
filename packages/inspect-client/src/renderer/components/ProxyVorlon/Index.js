import { remote } from 'electron';
import React from 'react';
import { Layout, Spin, Card, Col, Row, Menu } from 'antd';
import { connect } from 'dva';
import WebView from './WebView';
import VorlonView from './VorlonView';
import ProxyView from './ProxyView';

import Style from './Index.less';
import OperationBar from "./OperationBar";

const { Header, Content, Footer, Sider } = Layout;
const { proxyVorlon, localip } = remote.getGlobal('services');

/**
 *
 *
 *
 * @param {*} props
 */
function Container( props ) {
  const { url, height, id, className, vorlonUrl, anyproxyUrl, type, ip } = props;
  const newProps = { height, ip };
  return (
    <div id="content-container" className={Style.webviewContainer} >
      <div style={{display: type=='vorlon'?'block':'none'}}>
        <VorlonView {...newProps} url={vorlonUrl} />
      </div>
      <div style={{display: type=='anyproxy'?'block':'none'}}>
        <ProxyView {...newProps} url={anyproxyUrl}/>
      </div>
    </div>
  )
}
/** <VorlonView {...props} /> */
class ProxyVorlon extends React.Component {

  constructor () {
    super();
    this.state = {
      anyproxyUrl: '',
      vorlonUrl: '',
      ip: '',
      visible: false,
      height: 500,
      type: 'vorlon',
      loading: true,
    }
  }

  refreshHeight () {
    const totalHeight = parseInt(window.innerHeight);
    const titleDom = document.getElementById('title-container');
    const titleDomHeight = titleDom ? parseInt(titleDom.clientHeight) : 0;

    const mainDom = document.getElementById('main-container');
    const mainDomStyle = window.getComputedStyle(mainDom);
    const mainDomPaddingTop = parseInt(mainDomStyle['paddingTop']);
    const mainDomPaddingBottom = parseInt(mainDomStyle['paddingBottom']);

    const vorlonDom = document.getElementById('content-container');
    const vorlonDomStyle = window.getComputedStyle(vorlonDom);
    const vorlonDomMarginTop = parseInt(vorlonDomStyle['marginTop']);

    const operatorDom = document.getElementById('operator-contianer');
    let operatorDomHeight = 0;
    if ( operatorDom ) {
      const operatorDomStyle = window.getComputedStyle(operatorDom);
      operatorDomHeight = parseInt(operatorDomStyle['height']);
    }


    this.setState({
      height: ( totalHeight - titleDomHeight - mainDomPaddingBottom - mainDomPaddingTop - operatorDomHeight  - 2 -  vorlonDomMarginTop )
    })
  }

  componentDidMount() {
    const { startup } = proxyVorlon;
    const { dispatch } = this.props;

    const loopGetAllClients = (ip) => {
      dispatch({
        type: 'vorlon/requestClientList',
        payload: {
          ip
        },
        onSuccess: () => {
          setTimeout(() => {
            loopGetAllClients(ip);
          }, 1000);
        }
      })
    }

    window.addEventListener('resize', () => {
      this.refreshHeight();
    });

    startup()
      .then(() => {
        this.setState({
          loading: false
        })
        const ip = localip.getIPAddress();
        const vorlonUrl = `https://${ip}:5680/dashboard/default?nosidebar=true`;
        const type = 'vorlon';
        const visible = true;
        this.setState({
          ip,
          vorlonUrl,
          type,
          visible
        }, () => {
          loopGetAllClients(ip);
          this.refreshHeight();
        });
      })
      .catch(() => {

      });
  }


  onCardSelectChanged ( type ) {
    let url = '';
    const { ip } = this.state;
    const { clients } = this.props;
    if ( type == 'vorlon') {
      const { clientid } = clients[0] || '';
      url = `https://${ip}:5680/dashboard/default/${clientid}?nosidebar=true`;
      this.setState({
        type,
        vorlonUrl:url
      });

    } else {
      url = `http://${ip}:8002`;
      this.setState({
        type,
        proxyUrl: url
      });
    }

  }


  render () {
    const { vorlonUrl, proxyUrl, visible, ip, height, type, loading } = this.state;
    const { clients } = this.props;
    return (
      <Spin tip="服务启动中..." spinning={loading}>
        <div id="main-container" className={Style.mainContainer}>

          {/*<OperationBar*/}
            {/*onCardSelectChanged = {this.onCardSelectChanged.bind(this)}*/}
            {/*type={type}*/}
          {/*/>*/}
          {
            visible ?
              <Container
                ip={ip}
                height={height}
                type={type}
              />
              :
              <div style={{height: '680px'}}></div>
          }

          <div className={Style.statusBar} style={{display: loading ? 'none': ''}}>
            <span>运行状态栏</span>
          </div>

        </div>
      </Spin>
    )
  }
}

function mapStateToProps(state) {
  const { clients } = state.vorlon;
  return {
    clients
  };
}

export default connect(mapStateToProps)(ProxyVorlon);

