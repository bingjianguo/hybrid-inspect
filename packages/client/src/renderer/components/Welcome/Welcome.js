/**
 * Created by bingjian on 2017/3/11.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import './Welcome.css';

class Welcome extends Component {
  render() {
    return (
      <div>Welcome</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(Welcome);
