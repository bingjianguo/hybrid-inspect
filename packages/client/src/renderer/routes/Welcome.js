/**
 * Created by bingjian on 2017/3/10.
 */
import React from 'react';
import { connect } from 'dva';
import Welcome from '../components/Welcome';
import IndexLayout from '../components/Layout/IndexLayout';

function WelcomeRouter() {
  return (
    <IndexLayout>
      <Welcome />
    </IndexLayout>
    
  )
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(WelcomeRouter);
