import React from 'react';

class LayoutView extends React.Component {
  constructor () {
    super();
  }

  render () {
    const { layoutStyle } = this.props;
    if ( !layoutStyle ) return null;
    const { margin, border, padding, size } = layoutStyle;
    var w = size.width;
    if (w && w.indexOf('.') !== -1) {
      w = w.split('.')[0] + 'px';
    }
    var h = size.height;
    if (h && h.indexOf('.') !== -1) {
      h = h.split('.')[0] + 'px';
    }

    return (
      <div className="margin">
        <div className="label">margin</div>
        <div className="container" id="margincontainer">
            <div className="top">{margin.top}</div>
            <div className="bottom">{margin.bottom}</div>
            <div className="right">{margin.right}</div>
            <div className="left">{margin.left}</div>
        </div>
        <div className="border">
            <div className="label">border</div>
            <div className="container" id="bordercontainer">
                <div className="top">{border.topWidth}</div>
                <div className="bottom">{border.bottomWidth}</div>
                <div className="right">{border.rightWidth}</div>
                <div className="left">{border.leftWidth}</div>
            </div>
            <div className="padding">
                <div className="label">padding</div>
                <div className="container" id="paddingcontainer">
                    <div className="top">{padding.top}</div>
                    <div className="bottom">{padding.bottom}</div>
                    <div className="right">{padding.right}</div>
                    <div className="left">{padding.left}</div>
                </div>
                <div className="size" id="sizecontainer">
                  {w + " x " + h}
                </div>
            </div>
        </div>
      </div>
    )
  }
}
export default LayoutView;