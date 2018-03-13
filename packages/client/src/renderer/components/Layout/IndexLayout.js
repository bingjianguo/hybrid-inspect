import React, { Component, PureComponent } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import TitleBar from '../TitleBar/Index';

class IndexLayout extends PureComponent {
  render() {
    const { children, selectedNavKey } = this.props;
    return (
      <div>
        <TitleBar>{'Web代理开发调试工具'}</TitleBar>
        { children }
      </div>
    )
  }
}


export default IndexLayout;