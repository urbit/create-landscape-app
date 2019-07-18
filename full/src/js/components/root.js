import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import classnames from 'classnames';
import _ from 'lodash';
import { HeaderBar } from "./lib/header-bar.js"


export class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <BrowserRouter>
        <div>
        <HeaderBar/>
        <Route exact path="/~%APPNAME%" render={ () => {
          return (
            <div className="pa3 w-100">
              <h1 className="mt0 f2">%APPNAME%</h1>
              <p className="lh-copy measure pt3">Welcome to your Landscape application.</p>
              <p className="lh-copy measure pt3">To get started, edit <code>src/index.js</code> or <code>%APPNAME%.hoon</code> and <code>|commit %home</code> on your Urbit ship to see your changes.</p>
              <a className="black no-underline db body-large pt3" href="https://urbit.org/docs">-> Read the docs</a>
            </div>
          )}}
        />
        </div>
      </BrowserRouter>
    )
  }
}

