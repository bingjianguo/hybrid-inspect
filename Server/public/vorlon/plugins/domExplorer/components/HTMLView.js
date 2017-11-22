import React from 'react';
import ReactDOM from 'react-dom';

import { Input, Button, Modal } from 'antd';
import CodeMirrorEditor from './ReactCodeMirrorEditor';

const { TextArea } = Input;
const { Group: ButtonGroup } = Button;

function stripscript(s) {  
  // return s.replace(/<script.*?>.*?<\/script>/ig, '');  
  return s.replace(/<script(([\s\S])*?)<\/script>/ig, '');  
} 

function striplink(s) {  
  return s.replace(/<link.*?>/ig, '');  
} 

function stripstyle(s) {  
  return s.replace(/<style(([\s\S])*?)<\/style>/ig, '');  
} 


class InnerHTMLView extends React.Component {

  constructor () {
    super();
    this.state = {
      modalVisible: false
    }
    this.onFullScreen = this.onFullScreen.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { maxHeight } = nextProps;
    if (this.editor) {
      const dom = ReactDOM.findDOMNode(this.editor);
      $('.CodeMirror',dom).css({ height: maxHeight - 50 });
    }
  }

  onFullScreen () {
    
  }


  render () {
    const { innerHTML } = this.props;
    let value = '';
    if ( innerHTML ) {
      value = innerHTML.outerHTML.trim();
      
      value = stripscript(value);
      value = striplink(value);
      value = stripstyle(value);
      debugger;
    }

    return (
      <div>
        <ButtonGroup style={{marginBottom: '10px'}}>
          <Button size={'small'}>预览</Button>
          <Button size={'small'} onClick={this.onFullScreen}>查看</Button>
        </ButtonGroup>
        <CodeMirrorEditor 
          code={value}
          ref={(ele) => {this.editor = ele} }
        />
      </div>
    )
  }
}

export default InnerHTMLView;