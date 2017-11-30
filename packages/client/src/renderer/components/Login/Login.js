/**
 * Created by bingjian on 2017/3/11.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div>Login</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(Login);
