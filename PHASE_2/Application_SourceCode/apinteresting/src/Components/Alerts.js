import React, { Component } from 'react';
import PieChart from './PieChart';




export default class Alerts extends React.Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div>
                <PieChart/>
            </div>
        );
      }
}
