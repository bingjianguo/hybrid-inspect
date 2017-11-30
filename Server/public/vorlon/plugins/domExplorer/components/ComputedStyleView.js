import React from 'react';

class ComputedStyleView extends React.Component {

  constructor () {
    super();

  }

  render () {
    let { computedStyle } = this.props;
    if ( !computedStyle ) {
      computedStyle = [];
    } 
    return (
      <div>
        {
          computedStyle.map(item => (
            <div className="styleWrap"> 
              <span className="styleLabel">{item.name}</span>
              <span className="styleValue">{item.value}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

export default ComputedStyleView;