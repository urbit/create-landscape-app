import React, { Component } from 'react';
import { pour } from '/vendor/sigils-1.2.5';
import _ from 'lodash';

const ReactSVGComponents = {
  svg: p => {
    return (
      <svg key={Math.random()} 
        version={'1.1'}
        xmlns={'http://www.w3.org/2000/svg'}
        {...p.attr}>
       { _.map(_.get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </svg>
    )
  },
  circle: p => {
    return (
      <circle 
        key={Math.random()} {...p.attr}>
      { _.map(_.get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </circle>
    )
  },
  rect: p => {
    return (
      <rect 
        key={Math.random()} 
        {...p.attr}>
      { _.map(_.get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </rect>
    )
  },
  path: p => {
    return (
      <path
        key={Math.random()} 
        {...p.attr}>
      { _.map(_.get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </path>
    )
  },
  g: p => {
    return (
      <g
        key={Math.random()} 
        {...p.attr}>
        { _.map(_.get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </g>
    )
  },
  polygon: p => {
    return (
      <polygon
        key={Math.random()} 
        {...p.attr}>
      { _.map(_.get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </polygon>
    )
  },
  line: p => {
    return (
      <line
        key={Math.random()} 
        {...p.attr}>
      { _.map(_.get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </line>
    )
  },
  polyline: p => {
    return (
      <polyline
        key={Math.random()} 
        {...p.attr}>
      { _.map(_.get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </polyline>
    )
  }
}

export class SealDict {
  constructor() {
    this.dict = {};
  }

  getPrefix(patp) {
    return patp.length === 3 ? patp : patp.substr(0, 3);
  }

  getSeal(patp, size, prefix) {
    if (patp.length > 13) {
      patp = "tiz";
    }

    let sigilShip = prefix ? this.getPrefix(patp) : patp;
    let key = `${sigilShip}+${size}`;

    if (!this.dict[key]) {
      this.dict[key] = pour({size: size, patp: sigilShip, renderer: ReactSVGComponents, margin: 0, colorway: ["#fff", "#000"]})
    }

    return this.dict[key];
  }
}

const sealDict = new SealDict;
export { sealDict }
