import React from 'react';
import { Button, Spin, Row, Col } from 'antd';
import DynamicIFrame from './DynamicIFrame';
import Style from './Index.less';


class Preview extends React.PureComponent {

  constructor () {
    super();
    this.onImagePreviewClick = this.onImagePreviewClick.bind(this);
    this.onIframePreviewClick = this.onIframePreviewClick.bind(this);
    this.state = {
      dataUrl: null,
      html: '',
      loading: false,
      screen: null
    }

    this.extProps = {};
  }

  componentDidMount () {
    let dashboard = null;
    const dashboardFilterArray = VORLON.Core.DashboardPlugins.filter( item  => item.name === 'preview' );
    if (dashboardFilterArray.length > 0) {
      dashboard = dashboardFilterArray[0];
    }

    this.dashboard = dashboard;
  }

  onImagePreviewClick () {
    const { dashboard } = this;
    this.setState({
      loading: true
    })
    dashboard.sendToClient({
      message: 'preview'
    });
  }

  onIframePreviewClick () {
    const { dashboard } = this;
    this.setState({
      loading: true
    })
    dashboard.sendToClient({
      message: 'previewByIframe'
    });
  }

  externalSetProps (nextProps, cb) {
    const { extProps } = this;
    const newProps = {
      ...extProps,
      ...nextProps
    };

    const newExtPropsLength = Object.keys(newProps).length;
    const extPropsLength = Object.keys(extProps).length;
  
    if ( extPropsLength != newExtPropsLength) {
      if (extProps.dataUrl != newProps.dataUrl ) {}
      newProps.loading = false;
      this.setState(newProps);
    } else {
      let bChanged = false;
      Object.keys(extProps).forEach((key) => {
        if (extProps[key] != newProps[key]) {
          bChanged = true;
        }
      })
      if (bChanged) {
        if (extProps.dataUrl != newProps.dataUrl ) {}
        newProps.loading = false;
        this.setState(newProps);
      } else if ( !newProps.dataUrl ) {
        this.setState({loading: false});
      }
    }


    this.extProps = newProps;
  }

  render () {
    const { dataUrl, screen, html } = this.state;
    const containerStyle = {};
    if (screen) {
      containerStyle['height'] = `${screen.height}px`;
      containerStyle['width'] = `${screen.width}px`
    }
    return (
      <Row>
        <Col span={12}>
          <div className={Style.operationBar}>
            <Button
              type="primary"
              size={'small'}
              onClick={ this.onImagePreviewClick }
            >
              获取截屏
            </Button>
          </div>
          <Spin
            spinning={this.state.loading}
          >
            <div className={Style.previewImageContainer}>
              <div className={Style.previewWrapper} style={containerStyle} >
                <img src={dataUrl} />
              </div>
            </div>
          </Spin>
        </Col>
        <Col span={12}>
          <div className={Style.operationBar}>
            <Button
              type="primary"
              size={'small'}
              onClick={ this.onIframePreviewClick }
            >
              获取DOM结构
            </Button>
          </div>
          <Spin
            spinning={this.state.loading}
          >
            <div className={Style.previewImageContainer}>
              <div className={Style.previewWrapper} style={containerStyle} >
                <DynamicIFrame html={html}/>
              </div>
            </div>
          </Spin>
        </Col>
      </Row>
    )
  }
}

export default Preview;