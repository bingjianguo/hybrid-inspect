import React from 'react';

class YScrollView extends React.Component {

  render () {
    const { children, maxHeight, id } = this.props;
    const style = { overflowY: 'auto', padding: '10px'};
    if ( maxHeight ) {
      style['height'] = maxHeight + 'px';
    } else {
      style['height'] = '100px';
    }

    return (
      <div style={style} id={id}>
        { children }
      </div>
    )
  }
}

export default YScrollView;