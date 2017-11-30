import React from 'react';
import { Button, Spin } from 'antd';
import Style from './Index.less';


class Preview extends React.PureComponent {

  constructor () {
    super();
    this.onPreviewClick = this.onPreviewClick.bind(this);
    this.state = {
      dataUrl: null,
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

  onPreviewClick () {
    const { dashboard } = this;
    this.setState({
      loading: true
    })
    dashboard.sendToClient({
      message: 'preview'
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
      if (extProps.dataUrl != newProps.dataUrl) {
        newProps.loading = false;
      }
      this.setState(newProps);
    } else {
      let bChanged = false;
      Object.keys(extProps).forEach((key) => {
        if (extProps[key] != newProps[key]) {
          bChanged = true;
        }
      })
      if (bChanged) {
        if (extProps.dataUrl != newProps.dataUrl) {
          newProps.loading = false;
        }
        this.setState(newProps);
      }
    }

    this.extProps = newProps;
  }

  render () {
    const { dataUrl, screen } = this.state;
    const containerStyle = {};
    if (screen) {
      containerStyle['height'] = `${screen.height}px`;
      containerStyle['width'] = `${screen.width}px`
    }
    return (
      <div>
        <div>
          <Button 
            type="primary" 
            size={'small'}
            onClick={ this.onPreviewClick }
          >
            获取
          </Button>
        </div>
        <Spin 
          spinning={this.state.loading}
        >
          <div className={Style.previewImage} style={containerStyle} >
            <img src={dataUrl} />
          </div>
          
        </Spin>
      </div>
    )
  }
}

export default Preview;