import React from 'react';
import { Input, Button } from 'antd';

const { TextArea } = Input;
const { Group: ButtonGroup } = Button;

class InnerHTMLView extends React.Component {


  render () {
    const { innerHTML } = this.props;
    let value = '';
    if ( innerHTML ) {
      value = innerHTML.outerHTML.trim();
    }

    return (
      <div id="htmlsection" className="accordion-section">
        {/* <x-controlbar>
            <x-action event="gethtml" tabindex="0"><i class="fa fa-refresh"></i></x-action>
            <x-action event="savehtml" tabindex="0"><i class="fa fa-save"></i></x-action>
        </x-controlbar> */}
        <ButtonGroup style={{marginBottom: '10px'}}>
          <Button>获取HTML</Button>
          <Button>保存HTML</Button>
        </ButtonGroup>
        <TextArea 
          id="innerHTMLView" 
          rows={5}
          value={value}
        />
      </div>
    )
  }
}

export default InnerHTMLView;