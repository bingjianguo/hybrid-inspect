/**
 * Created by bingjian on 2017/3/10.
 */
import React from 'react';
import { connect } from 'dva';
import Welcome from '../components/Welcome/Welcome';
import Login from '../components/Login/Login';

function WelcomeRouter({ userInfo = {} }) {
  return userInfo.userId ?
    <Welcome /> :
    <Login />;
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(WelcomeRouter);
