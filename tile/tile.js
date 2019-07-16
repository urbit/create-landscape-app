import React, { Component } from 'react';
import classnames from 'classnames';

const outerSize = 234; //tile size

class %APPNAME% extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return <div className="w-100 h-100 relative" style={{ background: '#1a1a1a' }}>
    <p className="gray label-regular b absolute" style={{ left: 8, top: 4 }}>%APPNAME%</p>
    <p className="white">Welcome to your app, {this.props.data}.</p>
        </div>
  }
}

export default class %APPNAME%Tile extends Component {

  constructor(props) {
    super(props);
  }

  renderWrapper(child) {
    return (
      <div className="pa2" style={{
        width: outerSize,
        height: outerSize,
        background: 'rgb(26,26,26)'
      }}>
        {child}
      </div>
    );
  }

  render() {
    return this.renderWrapper((
      <%APPNAME% data={this.props.data}/>
    ));

  }

}

window.%APPNAME%Tile = %APPNAME%Tile;
