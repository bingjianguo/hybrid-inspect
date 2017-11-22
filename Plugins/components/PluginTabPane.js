import React from 'react';
import { Tabs } from 'antd';
import Style from './PluginTabPane';
const { TabPane } =Tabs;

class PluginTabPane extends React.Component {
  constructor () {
    super();
  }

  render () {
    const { plugin, index } = this.props;
    return (
      <TabPane
        forceRender={true}
        className={`plugin plugin-${plugin.id.toLowerCase()}`}
        tab={plugin.name}
        key={index}
        ref={() => {
          const { DashboardManager } = window.VORLON;
          const vorlonBaseURL = window.vorlonBaseURL;

          const pluginscript = document.createElement("script");
          pluginscript.setAttribute("src", vorlonBaseURL + "/vorlon/plugins/" + plugin.foldername + "/vorlon." + plugin.foldername + ".dashboard.js");

          pluginscript.onload = (oError) => {
            plugin.loaded = true;
            DashboardManager.StartListeningServer(DashboardManager.ListenClientid);
          };
          if ( !plugin.loaded )
            document.body.appendChild(pluginscript);
        }}
      >
        <div data-plugin={plugin.id} className={`${Style.pluginContainer}`}></div>
      </TabPane>
    )
  }
}

export default PluginTabPane;