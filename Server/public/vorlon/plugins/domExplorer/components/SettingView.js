import React from 'react';
import {Checkbox } from 'antd';

class SettingView extends React.Component {

  render () {
    return (
      <div id="settingssection" >
        <Checkbox onChange={() => {}}>自动刷新</Checkbox>
        <Checkbox onChange={() => {}}>全局加载</Checkbox>
      </div>
    )
  }
}

export default SettingView;