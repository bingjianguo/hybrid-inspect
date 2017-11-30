import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { remote } from 'electron';
import './OperationBar.less';

const { proxyVorlon } = remote.getGlobal('services');
const {
  stopAnyproxyProcess,
  startAnyproxyProcess,
  startVorlonProcess,
  stopVorlonProcess,
  isAnyproxyProcessRunning,
  isVorlonProcessRunning
} = proxyVorlon;
const ButtonGroup = Button.Group;

function OperationContent ( props ) {
  const { oper, onStopClick, onStartClick } = props;
  return (
    <Row>
      <Col span={12}>
        {oper.title}服务运行状态: {oper.status}
      </Col>
      <Col span={12} style={{textAlign: 'right'}}>
        <ButtonGroup>
          <Button
            onClick={() => {
              onStopClick(oper);
            }}
          >停止</Button>
          <Button
            type="primary"
            onClick={() => {
              onStartClick(oper);
            }}
          >
            启动
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
}

class OperationBar extends React.Component {

  constructor () {
    super();
    this.state = {
      operations: [{
        title: 'AnyProxy',
        type: 'anyproxy',
        disabled: true,
        status: isAnyproxyProcessRunning() ? '正在运行' : '已停止',
      }, {
        title: 'Vorlon',
        type: 'vorlon',
        status: isVorlonProcessRunning() ? '正在运行' : '已停止',
        disabled: false,
      }, {
        title: 'Mock',
        type: 'mock',
        disabled: true,
      }, {
        title: 'Assets',
        type: 'assets',
        disabled: true,
      }]
    }
  }


  onOperationItemStartClick (oper) {
    const { operations } = this.state;
    const onStatusChange = () => {
      oper.status = '正在运行';
      this.setState({
        operations
      });
    }
    if ( oper.type == 'anyproxy') {
      startAnyproxyProcess().then(onStatusChange);
    } else if (oper.type == 'vorlon') {
      startVorlonProcess().then(onStatusChange)
    }
  }

  onOperationItemStopClick (oper) {
    const { operations } = this.state;
    const onStatusChange = () => {
      oper.status = '已停止';
      this.setState({
        operations
      });
    }
    if ( oper.type == 'anyproxy') {
      stopAnyproxyProcess().then(onStatusChange)
    } else if (oper.type == 'vorlon') {
      stopVorlonProcess().then(onStatusChange)
    }
  }


  render () {
    const { type, onCardSelectChanged } = this.props;
    const { operations } = this.state;

    const enabledOperations = operations.filter((oper ) => {
      return !oper.disabled
    });

    const spanWidth = 24 / enabledOperations.length;

    return (
      <Row gutter={16} id="operator-contianer">
        {
          enabledOperations.map(( oper ) => {
            return (
              <Col span={spanWidth} key={oper.title}>
                <Card
                  title={oper.title}
                  bordered={false}
                  className={type==oper.type?'cardSelected':''}
                  onClick={() => {
                    onCardSelectChanged(oper.type);
                  }}
                >
                  <OperationContent
                    oper={oper}
                    onStartClick={this.onOperationItemStartClick.bind(this)}
                    onStopClick={this.onOperationItemStopClick.bind(this)}
                  />

                </Card>
              </Col>
            )
          })
        }

      </Row>
    )
  }
}

export default OperationBar;
