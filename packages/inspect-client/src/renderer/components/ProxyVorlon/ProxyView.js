import React from 'react';
import { Layout, Card, Col, Row, Menu } from 'antd';
import WebView from './WebView';

const { Header, Content, Footer, Sider } = Layout;

class ProxyView extends React.Component {

  constructor (props) {
    super(props);
    const { ip } = props;
    this.state = {
      ip,
      url: `http://${ip}:8002`
    }
  }

  render () {
    const { url } = this.state;
    const { height } = this.props;
    return (
      <Layout>
        <Content style={{height: `${height}px`}}>
          <WebView url={url} />
        </Content>
      </Layout>
    )
  }
}


export default ProxyView;