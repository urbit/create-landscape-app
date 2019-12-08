import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';


export default class %APPNAME%Tile extends Component {

  render() {
    return (
      <div className="w-100 h-100 relative" style={{ background: '#1a1a1a' }}>
          <p className="gray label-regular b absolute" style={{ left: 8, top: 4 }}>%APPNAME%</p>
      </div>
    );
  }

}

window.%APPNAME%Tile = %APPNAME%Tile;
