/**
 * Created by bingjian on 2017/3/10.
 */
import React from 'react';
import { Router, Route } from 'dva/router';
import Welcome from '../routes/Welcome';
import ProxyVorlon from '../routes/ProxyVorlon';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/welcome" component={Welcome} />
      <Route path="/proxyvorlon" component={ProxyVorlon} />
    </Router>
  );
}

export default RouterConfig;
