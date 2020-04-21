import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';


export default class Home extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }

  render() {
    return (
      <div>
        hello world
      </div>
    );
  }
}

