import React from 'react';
import { Tabs } from 'antd';
import SplitPane from 'react-split-pane';

import Style from './Plugins.less';

const { TabPane } = Tabs;

class Plugins extends React.Component {
  constructor () {
    super();

    this.state = {
      minSize: 'auto',
      tabPaneHeight: 'auto'
    }
  }

  componentDidMount () {
    $(window).on('PluginLoadFinish', () => {
      const tabBarNode = $('#pluginsPaneTop .ant-tabs-bar');
      const totalTabBarHeight = tabBarNode.outerHeight() + parseInt(tabBarNode.css('margin-top')) + parseInt(tabBarNode.css('margin-bottom'));
      const pconHeight = $('#pcon').outerHeight() ;
      this.setState({
        tabPaneHeight: `${pconHeight - totalTabBarHeight}px`,
      });
    });

    $(window).on('resize', () => {
      const tabBarNode = $('#pluginsPaneTop .ant-tabs-bar');
      const totalTabBarHeight = tabBarNode.outerHeight() + parseInt(tabBarNode.css('margin-top')) + parseInt(tabBarNode.css('margin-bottom'));
      const pconHeight = $('#pcon').outerHeight() ;
      this.setState({
        tabPaneHeight: `${pconHeight - totalTabBarHeight}px`,
      });
    });
  }

  getTabPane ( plugin, index) {
    const { tabPaneHeight } = this.state;
    return (
      <TabPane
        forceRender={true}
        className={`plugin plugin-${plugin.id.toLowerCase()}`}
        tab={plugin.name}
        style={{height: tabPaneHeight}}
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
        <div data-plugin={plugin.id} className={Style.pluginContainer}></div>
      </TabPane>
    )
  }

  render () {
    const { topPlugins } = this.props;
    return (
      <div
        id="pluginsPaneTop"
        style={{ width: '100%',display: (topPlugins.length > 0) ? 'block' : '' }}
      >
        <Tabs defaultActiveKey="0" onChange={() => {}}>
          {
            topPlugins.map((plugin, index) => {
              return this.getTabPane(plugin, index);
            })
          }
        </Tabs>
      </div>
    )
  }

  render__ () {
    const { topPlugins, bottomPlugins } = this.props;
    const { minSize } = this.state;
    return (
      <SplitPane 
        split="horizontal"
        minSize={minSize}
        defaultSize={'auto'}
        ref={(ele) => {
          this.root = ele;
        }}

        onChange={(topHeight) => { 
          this.onResizeLogsHeight(topHeight);
          const minTopHeight = $('#pluginsPaneTop .ant-tabs').outerHeight();
          this.setState({
            minSize: minTopHeight
          });
        }}
      >

        <div
          id="pluginsPaneBottom"
          className="panel-bottom bottom_panel"
        >
          {
            bottomPlugins >= 1 ? 
              <Tabs defaultActiveKey="0" onChange={() => {}}>
                {
                  bottomPlugins.map((plugin, index) => {
                    return this.getTabPane(plugin, index);
                  })
                }
              </Tabs>
              :
              <div>
                {
                  bottomPlugins.map((plugin, index) => {
                    return this.getTabPane(plugin, index);
                  })
                }
              </div>
          }
        
        </div>
      </SplitPane>
    )
  }
}

export default Plugins;