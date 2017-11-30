import React from 'react';
import Style from './NavClient.less';
import { Layout, Menu, Icon, Badge} from 'antd';

const { Header, Footer, Sider } = Layout;



class NavClient extends React.Component {

  componentDidMount () {
    const { DashboardManager } = window.VORLON;
    this.DashboardManager = DashboardManager;
  }

  onMenuItemHover (item) {
    this.DashboardManager.Identify(item);
  }

  render() {
    const { clients, onMenuItemSelect } = this.props;
    let selectedKey = '-1';
    const DashboardManager = window.VORLON.DashboardManager;
    clients.forEach((client, index) => {
      if ( client.clientid == DashboardManager.ListenClientid) {
        selectedKey = index + '';
      }
    });

    return (
      <div>
        <div className={Style.logo}>
          Hybrid Inspect
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
        >
          {
            clients.map((item, key) => {
              const { heart } = item;
              const status = heart ? 'success' : 'error';
              return (
                <Menu.Item key={key} className={Style.menuItem} onMouseEnter={this.onMenuItemHover.bind(this, item)} >
                  <Badge dot={true} status={status}/>
                  <div
                    className={Style.menuItemContent}
                    onClick={() => { onMenuItemSelect(item); }}
                  >
                    <div className={Style.menuItemTitle}>{item.displayid} - {item.title}</div>
                    <div className={Style.menuItemUrl}>{item.url}</div>
                  </div>
                  <Icon
                    type="close-circle"
                    style={{marginLeft: '6px'}}
                    onClick={this.onClientRemove.bind(this, item)}
                  />
                </Menu.Item>
              )
            })
          }
        </Menu>
      </div>
    )
  }

  onClientRemove (record) {
    const DashboardManager = window.VORLON.DashboardManager;

    DashboardManager.removeClientByOperator(record);
  }
}
export default NavClient;