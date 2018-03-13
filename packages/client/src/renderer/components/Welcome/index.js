import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { remote } from 'electron';

const { windowsManager: { closeWelcomeWindow, newProxyVorlonWindow } } = remote.getGlobal('services');
import Styles from './index.less';

const { Grid } = Card;
const gridStyle = {
  width: '50%'
};

export default class Welcome extends PureComponent {
  render() {
    return (
      <div className={Styles.welcomeContainer}>
        <Card
          style={{ marginBottom: 24 }}
          title="服务列表"
          bordered={false}
          extra={null}
          loading={false}
          bodyStyle={{ padding: 0 }}
        >
          <Grid style={gridStyle}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
              <div>
                <span>Anyproxy服务详情</span>
              </div>
              <div>
                正在运行中
              </div>
            </Card>
          </Grid>
          <Grid style={gridStyle}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
              <div>
                <span>Vorlon服务详情</span>
              </div>
              <div>
                <a 
                  href="javascript:;"
                  onClick={() => {
                    newProxyVorlonWindow();
                    // closeWelcomeWindow();
                  }}
                >
                  打开调试界面
                </a>
              </div>
            </Card>
          </Grid>
        </Card>

        <Card
          style={{ marginBottom: 24 }}
          title="服务配置详情"
          bordered={false}
          extra={null}
          loading={false}
          bodyStyle={{ padding: 0 }}
        >
        </Card>
      </div>
    )
  }
}