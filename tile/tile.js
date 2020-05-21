import React, { Component } from 'react';
import _ from 'lodash';


export default class %APPNAME%Tile extends Component {

  // SAMPLE TILE APP
  constructor(props) {
    super(props)
    this.state = {sponsor: '', date: ''}
  }
  // SAMPLE END

  render() {

    // SAMPLE TILE APP
    //
    const data = this.props.data || {}
    // console.log('render data', data)

    this.sponsor = <span>&mdash;</span>
    this.date = <span>&mdash;</span>

    if (data.sponsor !== undefined)
      this.sponsor = data.sponsor

    if (data.date !== undefined)
      this.date = data.date

    if (data.unknown !== undefined)
      console.log('unknown:', data.unknown)
    //
    // SAMPLE END

    return (
      <div className="w-100 h-100 relative bg-white bg-gray0-d ba b--black b--gray1-d">
        <p className="black white-d absolute f9" style={{ left: 8, top: 8 }}>%APPNAME%Cap</p>
        {/* SAMPLE TILE APP */}
        <div className={'mt4'} style={{fontSize: '.5rem'}}>
          <button className={'mt3 ml2'}
            onClick={() => api.action('%APPNAME%', 'json', {action: 'sponsor'})}
          >
            Sponsor
          </button>
          <p className={'mt1 ml2'}>{this.sponsor}</p>
          <button className={'mt3 ml2'}
            onClick={() => api.action('%APPNAME%', 'json', {action: 'date'})}
          >
            Date
          </button>
          <p className={'mt1 ml2'}>{this.date}</p>
          <button className={'mt3 ml2'}
            onClick={() => api.action('%APPNAME%', 'json', {action: 'both'})}
          >
            Both
          </button>
        </div>
        {/* SAMPLE END */}
      </div>
    )
  }
}

window.%APPNAME%Tile = %APPNAME%Tile;
