import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Input, Card, Collapse } from 'antd';
import LayoutView from './LayoutView';
import HTMLView from './HTMLView';
import ComputedStyleView from './ComputedStyleView';
import SettingView from './SettingView';
import YScrollView from './YScrollView';

const Panel = Collapse.Panel;

class DomExplorer extends React.Component {
  constructor () {
    super();
    this.state = {
      active: false,
      activeKey: '1',
      computedStyle: null,
      layoutStyle: null,
      innerHTML: null,
      internalId: null,
    }
    this.extProps = { };

    this.onStyleAccordionChanged = this.onStyleAccordionChanged.bind(this);
  }

  externalSetProps (nextProps, cb) {
    const { extProps } = this;
    const { select } = nextProps;
    if ( select ) delete nextProps.select;
    const newProps = {
      ...extProps,
      ...nextProps
    };

    const { internalId } = newProps;
    const newExtPropsLength = Object.keys(newProps).length;
    const extPropsLength = Object.keys(extProps).length;
    
    if ( select ) {
      if (internalId != extProps.internalId) {
        this.setState(newProps, () => {
          const { activeKey } = this.state;
          this.updateAccordionPaneContent(activeKey);
        });
      }

    } else {
      if ( extPropsLength != newExtPropsLength) {
        this.setState(newProps);
      } else {
        let bChanged = false;
        Object.keys(extProps).forEach((key) => {
          if (extProps[key] != newProps[key]) {
            bChanged = true;
          }
        })
        if (bChanged) {
          this.setState(newProps);
        }
      }
    }



    this.extProps = newProps;
  }

  componentDidMount () {
    let dashboard = null;
    const dashboardFilterArray = VORLON.Core.DashboardPlugins.filter( item  => item.name === 'domExplorer' );
    if (dashboardFilterArray.length > 0) {
      dashboard = dashboardFilterArray[0];
    }

    this.dashboard = dashboard;

    dashboard._ready = true;
    dashboard.sendCommandToClient("getMutationObeserverAvailability");

    this.bindTreeViewMouseEnter();
    this.bindTreeViewMouserLeave();

    this.setState({
      active: true
    })
  }

  /**
   * 
   * @param {*} e 
   */
  onTreeViewClick (e) {
    var button = e.target;
    if (button.className.match('treeNodeButton')) {
      button.hasAttribute('data-collapsed') ? button.removeAttribute('data-collapsed') : button.setAttribute('data-collapsed', '');
    }
  }


  
  /**
   * 注册moouseenter的捕获事件
   */
  bindTreeViewMouseEnter () {
    const { treeDiv, dashboard } = this;
    treeDiv.addEventListener('mouseenter', e => {
      var node = e.target;
      var parent = node.parentElement;
      var isHeader = node.className.match('treeNodeHeader');
      if (isHeader || parent.className.match('treeNodeClosingText')) {
        if (isHeader) {
          parent.setAttribute('data-hovered-tag', '');
          var id = $(node).data('internalid');
          if (id) {
            dashboard.hoverNode(id);
          }
        }
        else {
          parent.parentElement.setAttribute('data-hovered-tag', '');
          var id = $(parent).data('internalid');
          if (id) {
            dashboard.hoverNode(id);
          }
        }
      }
    }, true);
  }
  /**
   * 
   */
  bindTreeViewMouserLeave () {
    const { treeDiv, dashboard } = this;
    treeDiv.addEventListener('mouseleave', e => {
      var node = e.target;
      if (node.className.match('treeNodeHeader') || node.parentElement.className.match('treeNodeClosingText')) {
        var hovered = this.treeDiv.querySelector('[data-hovered-tag]');
        if (hovered) hovered.removeAttribute('data-hovered-tag');
        dashboard.hoverNode(null, true);
      }
    }, true);
  }

  /**
   * 
   */
  bindRefresh () {
    const { root, dashboard } = this;
    root.addEventListener('refresh', () => {
      dashboard.sendCommandToClient('refresh');
    });
  }

  /**
   * 
   * @param {*} index 
   */
  updateAccordionPaneContent (index) {
    const { dashboard } = this;
    const {
      computedStyle,
      layoutStyle,
      innerHTML,
      internalId
    } = this.state;

    if (index == '1') {  
    } else if (index == '2') {
      if ( !layoutStyle ) {
        dashboard.sendCommandToClient('getStyle', {
          order: internalId
        });
      }
    } else if (index == '3') {
      if ( !computedStyle ) {
        dashboard.sendCommandToClient('getComputedStyleById', {
          order: internalId
        });
      }
     
    } else if (index == '4') {
      if ( !innerHTML ) {
        dashboard.sendCommandToClient('getInnerHTML', {
          order: internalId
        });
      }
    } else if (index == '5') {

    }
  }

  /**
   * index 
   * 1. 样式
   * 2. 布局
   * 3. 计算样式
   * 4. 主文档结构
   * 5. 设置
   */
  onStyleAccordionChanged (index) {
    this.setState({
      activeKey: index
    }, () => {
      this.updateAccordionPaneContent(index);
    });
  }


  render () {
    const { active, activeKey, computedStyle, layoutStyle, innerHTML, maxHeight } = this.state;
    const activeClass = active ? 'active' : '';
    const treeViewStyle = {};
    let paneMaxHeight = 0;
    if (maxHeight) {
      treeViewStyle['height'] = `${maxHeight - 100}px`;
      paneMaxHeight = maxHeight - 260;
    }

    return (
      <div id="rootDomExplorer" ref={ele => { this.root = ele}} >
        <div className={ `tree-view-wrapper panel-left ${activeClass}`}>
          <Card 
            title={ <Button type="primary" size={'small'} ref={ele => { this.refreshButton = ReactDOM.findDOMNode(ele); }}>刷新</Button>}
            extra={ <Input size="small" />} 
            bordered={false}
          >
            <div id="treeView" 
              onClick={this.onTreeViewClick.bind(this)}
              className="code-text" 
              style={treeViewStyle}
              ref={ele => this.treeDiv = ele }>
            </div>
          </Card>
          <div className="domload-spinner">
            <div className="ant-spin ant-spin-lg ant-spin-spinning">
                <span className="ant-spin-dot">
                    <i></i><i></i><i></i><i></i>
                </span>
            </div>
            <div style={{position: 'absolute', left: '50%', 'top': '60%'}}>
                <span style={{ marginLeft: '-25%',whiteSpace: 'nowrap' }}>双击刷新页面</span>
            </div>
          </div>
        </div>

        <div className="style-view-wrapper panel-right code-text">

          <Collapse 
            bordered={true} 
            defaultActiveKey={['1']}
            activeKey={[activeKey]}
            accordion
            onChange={this.onStyleAccordionChanged}
          >
            <Panel header="样式" key="1">
              <YScrollView
                maxHeight={paneMaxHeight}
              >
                <div ref={ele => this.styleView=ReactDOM.findDOMNode(ele)}></div>
              </YScrollView>
              
            </Panel>
            <Panel header="布局" key="2" >
              <YScrollView id="layoutsection" maxHeight={paneMaxHeight}>
                <LayoutView layoutStyle={layoutStyle}/>
              </YScrollView>
            </Panel>
            <Panel header="计算样式" key="3" style={{padding: 0}}>
              <YScrollView maxHeight={paneMaxHeight}>
                <ComputedStyleView 
                  computedStyle={computedStyle}
                />
              </YScrollView>
            </Panel>
            <Panel header="主文档结构" key="4">
              <YScrollView maxHeight={paneMaxHeight}>
                <HTMLView innerHTML= { innerHTML }/>
              </YScrollView>
            </Panel>
            <Panel header="设置" key="5">
              <YScrollView maxHeight={paneMaxHeight}>
                <SettingView />
              </YScrollView>
            </Panel>
          </Collapse>
        </div>
      </div>
    )
  }
}

export default DomExplorer;