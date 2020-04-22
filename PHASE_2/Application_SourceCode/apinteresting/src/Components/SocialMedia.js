import React, { Component } from 'react';
import GoogleTrendChart from './GoogleTrendChart.js'



class SocialMedia extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <GoogleTrendChart />
      </div>
    );
  }
}
export default SocialMedia;
