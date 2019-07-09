import React, { Component } from 'react';
import classnames from 'classnames';

const outerSize = 234; //tile size

class %APPNAME% extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return <div>
    <p>Welcome to your app.</p>
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
        background: 'white'
      }}>
        {child}
      </div>
    );
  }

  render() {
    return this.renderWrapper((
      <%APPNAME%/>
    ));

  }

}

window.%APPNAME%Tile = %APPNAME%Tile;
