import React from 'react';
import { Layout, Card, Col, Row, Menu, Icon } from 'antd';
import { connect } from 'dva';

import WebView from './WebView';
import Styles from './VorlonView.less';

const { Header, Content, Footer, Sider } = Layout;

const vorlonViewId = 'vorlon-container';

class VorlonView  extends React.Component {
  /**
   *
   * @param {*} props
   */
  constructor (props) {
    super(props);
    const { clients, ip } = props;
    this.state = {
      clients: clients || [],
      ip,
      url: `https://${ip}:5680/dashboard/default?nosidebar=true`
    }
  }

  onMenuSelected (data) {
    const { key } = data;
    const { clients } = this.props;
    const { ip } = this.state;

    if ( clients && clients[key] ) {
      const { clientid } = clients[key];
      this.setState({
        url: `https://${ip}:5680/dashboard/default/${clientid}?nosidebar=true`
      })
    }
  }

  onVorlonViewReload (client) {
    const node = document.getElementById(vorlonViewId);
    node.contentWindow.location.reload(true);
  }

  onVorlonViewClose (client) {
    debugger;
  }

  render () {
    const { url } = this.state;
    const { clients, ip, height, className } = this.props;
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff', display: 'none'}}>
          <div className={Styles.menuTitle}>
            客户端链接地址
          </div>
          <Menu
            mode="inline"
            onSelect={this.onMenuSelected.bind(this)}

          >
            {
              clients.map((client, index) => {
                const { clientid, name, url, title } = client;
                return (
                  <Menu.Item key={index} className={Styles.menuItem}>
                    <Icon type="reload" className={Styles.menuItemReloadIcon} onClick={this.onVorlonViewReload.bind(this, client)}/>
                    <Icon type="close" className={Styles.menuItemCloseIcon} onClick={this.onVorlonViewClose.bind(this, client)}/>
                    <div className={Styles.menuItemTitle}>{title}</div>
                    <div className={Styles.menuItemText}>{url}</div>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Sider>
        <Content className={Styles.wrapper} style={{height: height + 'px'}}>
          <WebView url={url} id={vorlonViewId}/>
        </Content>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  const { clients } = state.vorlon;
  return {
    clients
  };
}

 export default connect(mapStateToProps)(VorlonView);
