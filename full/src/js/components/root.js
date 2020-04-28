import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import _ from 'lodash';
import { HeaderBar } from "./lib/header-bar.js"


export class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <BrowserRouter>
        <div className="absolute h-100 w-100 bg-gray0-d ph4-m ph4-l ph4-xl pb4-m pb4-l pb4-xl">
        <HeaderBar/>
        <Route exact path="/~%APPNAME%" render={ () => {
          return (
            <div className="cf w-100 flex flex-column pa4 ba-m ba-l ba-xl b--gray2 br1 h-100 h-100-minus-40-s h-100-minus-40-m h-100-minus-40-l h-100-minus-40-xl f9 white-d overflow-x-hidden">
              <h1 className="mt0 f8 fw4">%APPNAME%</h1>
              <p className="lh-copy measure pt3">Welcome to your Landscape application.</p>
              <p className="lh-copy measure pt3">To get started, edit <code>src/index.js</code>, <code>tile/tile.js</code> or <code>urbit/app/%APPNAME%.hoon</code> and <code>|commit %home</code> on your Urbit ship to see your changes.</p>
              <a className="black no-underline db f8 pt3" href="https://urbit.org/docs">-> Read the docs</a>
            </div>
          )}}
        />
        </div>
      </BrowserRouter>
    )
  }
}

