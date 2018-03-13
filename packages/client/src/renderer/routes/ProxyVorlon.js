import React from 'react';
import { connect } from 'dva';
import ProxyVorlon from '../components/ProxyVorlon/Index';
import IndexLayout from '../components/Layout/IndexLayout';


function ProxyVorlonRouter() {
  return (
    <IndexLayout>
      <ProxyVorlon />
    </IndexLayout>
  );
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(ProxyVorlonRouter);
