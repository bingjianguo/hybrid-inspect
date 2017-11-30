/**
 * Created by bingjian on 2017/3/13.
 */
import React from 'react';
import { connect } from 'dva';
import BugMe from '../components/BugMe/Index';
import TitleBar from '../components/TitleBar';


function BugMeRouter() {
  return (
    <div>
      <TitleBar>{'BugMe-桌面调试工具'}</TitleBar>
      <BugMe />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(BugMeRouter);
