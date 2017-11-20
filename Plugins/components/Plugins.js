import React from 'react';
import { Tabs } from 'antd'
import Style from './Plugins.less';

const TabPane = Tabs.TabPane;

class Plugins extends React.Component {
  constructor () {
    super();
  }

  //
  // for (var i = 0; i < catalog.plugins.length; i++) {
  //   // render tabs
  //   var plugin = catalog.plugins[i];
  //   var existingLocation = document.querySelector('[data-plugin=' + plugin.id + ']');
  //   var plugintab = document.createElement('div');
  //   plugintab.classList.add('tab');
  //   plugintab.textContent = plugin.name;
  //   plugintab.setAttribute('data-plugin-target', plugin.id);
  //
  //   if (!plugin.enabled || (DashboardManager.NoWindowMode && !plugin.nodeCompliant) || (!DashboardManager.NoWindowMode && plugin.nodeOnly)){
  //     plugintab.style.display = 'none';
  //     divPluginBottomTabs.appendChild(plugintab);
  //     continue;
  //   }
  //
  //   var existingLocation = document.querySelector('[data-plugin=' + plugin.id + ']');
  //
  //   if (!existingLocation) {
  //     var pluginmaindiv = document.createElement('div');
  //     pluginmaindiv.classList.add('plugin');
  //     pluginmaindiv.classList.add('plugin-' + plugin.id.toLowerCase());
  //     pluginmaindiv.setAttribute('data-plugin', plugin.id);
  //
  //     var plugintab = document.createElement('div');
  //     plugintab.classList.add('tab');
  //     plugintab.textContent = plugin.name;
  //     plugintab.setAttribute('data-plugin-target', plugin.id);
  //     plugintab.setAttribute('aria-describedby', 'aria-pluginDesc');
  //     plugintab.setAttribute('tabindex', "0");
  //     plugintab.setAttribute('role', 'button');
  //
  //     if (plugin.panel === "bottom") {
  //       if (divPluginsBottom.children.length === 1) {
  //         pluginmaindiv.classList.add("active");
  //         plugintab.classList.add('active');
  //       }
  //       divPluginsBottom.appendChild(pluginmaindiv);
  //       divPluginBottomTabs.appendChild(plugintab);
  //     }
  //     else {
  //       if (divPluginsTop.children.length === 1) {
  //         pluginmaindiv.classList.add("active");
  //         plugintab.classList.add('active');
  //       }
  //       divPluginsTop.appendChild(pluginmaindiv);
  //       divPluginTopTabs.appendChild(plugintab);
  //     }
  //   }


  //   var pluginscript = document.createElement("script");
  //   pluginscript.setAttribute("src", vorlonBaseURL + "/vorlon/plugins/" + plugin.foldername + "/vorlon." + plugin.foldername + ".dashboard.js");
  //
  //   pluginscript.onload = (oError) => {
  //     pluginLoaded++;
  //     if (pluginLoaded >= pluginstoload) {
  //       DashboardManager.StartListeningServer(DashboardManager.ListenClientid);
  //       coreLoaded = true;
  //       this.PluginsLoaded = true;
  //       DashboardManager.HideWaitingLogo();
  //     }
  //   };
  //   document.body.appendChild(pluginscript);
  // }

  render () {
    const { topPlugins, bottomPlugins } = this.props;

    return (

      <div className="dashboard-plugins">
        <div id="pluginsPaneTop" style={{display: (topPlugins.length > 0) ? 'block' : '' }} className="panel-top top_panel">
          <Tabs defaultActiveKey="0" onChange={() => {}}>
            {
              topPlugins.map((plugin, index) => {
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
                    <div data-plugin={plugin.id}></div>
                  </TabPane>
                )
              })
            }

          </Tabs>
        </div>
        <div className={Style.splitter}></div>
        <div id="pluginsPaneBottom" className="panel-bottom bottom_panel">
          <Tabs defaultActiveKey="0" onChange={() => {}}>
            {
              bottomPlugins.map((plugin, index) => {
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
              })
            }

          </Tabs>
        </div>
      </div>
    )
  }
}

export default Plugins;