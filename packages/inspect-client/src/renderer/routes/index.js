/**
 * Created by bingjian on 2017/3/10.
 */
import React from 'react';
import { Router, Route } from 'dva/router';
import Welcome from '../routes/Welcome';
import BugMe from '../routes/BugMe';
import ProxyVorlon from '../routes/ProxyVorlon';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/welcome" component={Welcome} />
      <Route path="/proxyvorlon" component={ProxyVorlon} />
      <Route path="/bugme" component={BugMe} />
    </Router>
  );
}

export default RouterConfig;
