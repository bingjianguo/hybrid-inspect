import React from 'react';
import QRCode from 'qrcode';
import { Steps, Button, message, Icon, Input, Alert } from 'antd';
import Style from './Introduction.less';

const { Step } = Steps;

class Introduction extends React.Component {

  constructor () {
    super();
    const certUrl = `http://${location.hostname}:8002/fetchCrtFile`;

    const getQrCanvas = () => {
      const init = () => {
        QRCode.toCanvas(document.getElementById('canvas'),
          certUrl,
          { toSJISFunc: QRCode.toSJIS },
          (error) => {
            if (error) console.error(error)
            console.log('success!')
          })
      }
      return (
        <canvas id="canvas" ref={init}></canvas>
      )
    }

    this.state = {
      steps: [{
        title: '安装HTTPS证书',
        content: (
          <div style={{textAlign: 'center'}}>
            { getQrCanvas() }
            <div>手机扫描二维码安装HTTPS证书</div>
            <a href={certUrl} >点击下载</a>
          </div>
        ),
      }, {
        title: '设置代理服务器',
        content: (
          <div>
            <p>
              代理服务器地址为：{location.hostname}, 端口: 8001
            </p>
            <p>
              请在wifi设置中配置
            </p>
            <div>
              <div className={Style.proxyConfigWrap}>
                <div>ios</div>
                <img className={Style.proxyConfigImage} src="https://zos.alipayobjects.com/rmsportal/tLGqIozhffTccUgPakuw.png" />
              </div>
              <div className={Style.proxyConfigWrap}>
                <div>android</div>
                <img className={Style.proxyConfigImage}  src="https://zos.alipayobjects.com/rmsportal/YQtbQYVNuOszZGdAOauU.png"/>
              </div>
            </div>
            <Alert
              message={
                <div>
                  在设置代理服务器之前，需要信任https证书，请参考如下链接文档"信任CA证书"部分  http://anyproxy.io/cn.html
                </div>
              }
              type="warning"
              showIcon
            />
          </div>
        ),
      }, {
        title: '打开调试页面',
        content: (
          <div className={Style.urlQrGenContainer}>
            <Input
              addonAfter={<span style={{cursor: 'pointer'}} onClick={this.onUrlQrGenerate.bind(this)}>生成二维码</span>}
              defaultValue="https://"
              placeholder="请输入页面地址"
              ref={(ele) => { this.inputUrlEle = ele }}
            />
            <canvas id="canvasUrl" />
          </div>
        )
      }],
      current: 0
    }
  }


  onUrlQrGenerate () {
    const url = this.inputUrlEle.refs['input'].value;
    const node = document.getElementById('canvasUrl');
    QRCode.toCanvas(
      node,
      url,
      { toSJISFunc: QRCode.toSJIS },
      (error) => {
        if (error) console.error(error)
        console.log('success!')
      }
    );
  }

  render () {

    const { steps, current } = this.state;

    return (
      <div className={Style.container}>
        <h1 className={Style.title}>移动调试</h1>
        <h2 className={Style.bulletTitle}>1. 代理调试方案</h2>
        <Steps current={current} className={Style.stepContainer}>
          {
            steps.map((item, index) =>
              <Step
                key={item.title}
                title={item.title}
                onClick={() => {
                  this.setState({
                    current: index
                  })
                }}
              />
            )
          }
        </Steps>
        <div className="stepContent">{steps[this.state.current].content}</div>
        <h2 className={Style.bulletTitle}>2. 插入代码调试方案</h2>
        <Alert
          className={Style.infoContainer}
          message="直接插入调试代码的方案"
          description={ `可以再待调试的页面插入以下的代码   <script src='${location.origin}/vorlon.js'></script>` }
          type="info"
          showIcon
        />
      </div>
    )
  }
}

export default Introduction;