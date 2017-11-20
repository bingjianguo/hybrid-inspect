import React from 'react';
import { Layout, Menu, Icon, Checkbox } from 'antd';
import Style from './DashBoard.less';

import Plugins from '../components/Plugins';
import NavClient from "../components/NavClient";
import Introduction from "../components/Introduction";

const { Header, Content, Footer, Sider } = Layout;
const $ = window.$;

class DashBoard extends React.Component {

  constructor () {
    super();
    this.state = {
      clients: [],
      topPlugins: [],
      bottomPlugins: [],
      plugins: [],
      bForceShowIntroduction: false
    };

    this.DashboardManager = window.VORLON.DashboardManager;
    this.vorlonBaseURL = window.vorlonBaseURL
  }

  onGetClientsFromManager ( clients ) {
    //Test if the client to display is in the list
    const { DashboardManager } = this;
    var contains = false;
    if (clients && clients.length) {
      for (var j = 0; j < clients.length; j++) {
        if (clients[j].clientid === DashboardManager.ListenClientid) {
          contains = true;
          break;
        }
      }
    }

    if (!contains) {
      DashboardManager.ListenClientid = "";
    }

    this.setState({
      clients
    });

    //Show waiting logo
    if(!contains || clients.length === 0){
      DashboardManager.DisplayWaitingLogo(false);
    }

    for (var i = 0; i < clients.length; i++) {
      var client = clients[i];
      DashboardManager.AddClientToList(client);
    }

    if (contains) {
      DashboardManager.loadPlugins();
    }
  }


  onLoadPlugins (catalog) {
    const { DashboardManager, vorlonBaseURL } = this;
    var pluginLoaded = 0;
    var pluginstoload = 0;

    //Cleaning unwanted plugins
    for(var i = 0; i < catalog.plugins.length; i++){
      var plugin = catalog.plugins[i];

      if(plugin.enabled){
        if (DashboardManager.NoWindowMode) {
          if (!plugin.nodeCompliant) {
            continue;
          }
        }

        if (!DashboardManager.NoWindowMode) {
          if (plugin.nodeOnly) {
            continue;
          }
        }

        pluginstoload ++;
      }
    }
    const { plugins } = catalog;

    const topPlugins = plugins.filter((plugin) => {
      return plugin.enabled && plugin.panel === 'top';
    });

    const bottomPlugins = plugins.filter((plugin) => {
      return plugin.enabled && plugin.panel === 'bottom';
    })
    this.setState({
      bottomPlugins,
      topPlugins,
      plugins
    })
  }

  componentDidMount () {
    $(window).on('DashBoard.GetClients', (e, clients) => {
      this.onGetClientsFromManager(clients);
    });

    $(window).on('DashBoard.addClient', (e, client) => {
      let { clients } = this.state;
      clients = [
        ...clients,
        client
      ];
      this.setState({
        clients
      });
    });

    $(window).on('DashBoard.removeClient', (e, client) => {
      let { clients } = this.state;
      clients = clients.filter((item) => {
        return item.clientid != client.clientid;
      });
      this.setState({
        clients
      });
    })

    $(window).on('DashBoard.loadPlugins', (e, catalog) => {
      this.onLoadPlugins(catalog);
    })

    $(window).on('resize', () => {
      const totalHeight = $(window).height();
      if ($('#pcon').length > 0) {
        const topBottomMargin =
          parseFloat($('#pcon').css('margin-top')) +  parseFloat($('#pcon').css('margin-bottom'));
        $('#pcon').height(totalHeight - topBottomMargin);
      }
    });

  }

  /**
   *
   * @param record
   */
  onMenuItemSelect (record) {
    const { DashboardManager } = this;
    const { clientid } = record;
    if ( DashboardManager.ListenClientid != clientid ) {
      location.href = `/dashboard/default/${clientid}`;
    }
  }

  render () {
    const { clients,  bottomPlugins, topPlugins, bForceShowIntroduction } = this.state;

    return (
      <Layout>
        <Sider className={Style.sideBar} >
          <NavClient
            clients={clients}
            onMenuItemSelect={this.onMenuItemSelect.bind(this)}
          />
          <div
            className={Style.helpWrap}
          >
            <Checkbox
              onChange={(e) => {
                this.setState({
                  bForceShowIntroduction: e.target.checked
                });
              }}
            >
              显示帮助信息
            </Checkbox>
          </div>
        </Sider>

        <Layout className={Style.contentLayout} style={{}}>
          <Content
            id="pcon"
            className={Style.pluignContainer}
            ref={() => {
              // $(window).trigger('resize');$('#pcon').scrollTop(0);
            }}
          >
            <div style={{display: bForceShowIntroduction || (topPlugins.length == 0 && bottomPlugins.length == 0) ? '' : 'none'}}>
              <Introduction/>
            </div>

            <div style={{display: bForceShowIntroduction ? 'none' : '' }}>
              {
                (topPlugins.length > 0 || bottomPlugins.length > 0) ?
                  <Plugins
                    topPlugins={topPlugins}
                    bottomPlugins={bottomPlugins}
                  />
                  :
                  null
              }
            </div>
          </Content>

        </Layout>
      </Layout>
    )
  }
}

export default DashBoard;