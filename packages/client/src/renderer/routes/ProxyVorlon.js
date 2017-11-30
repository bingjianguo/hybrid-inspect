import React from 'react';
import { connect } from 'dva';
import ProxyVorlon from '../components/ProxyVorlon/Index';
import TitleBar from '../components/TitleBar';


function ProxyVorlonRouter() {
  return (
    <div>
      <TitleBar>{'ProxyVorlon-桌面代理调试工具'}</TitleBar>
      <ProxyVorlon />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(ProxyVorlonRouter);
