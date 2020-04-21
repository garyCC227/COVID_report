import React, { Component } from 'react';
import StockChart from './StockChart.js';
import GoogleTrendChart from './GoogleTrendChart.js'



class SocialMedia extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <GoogleTrendChart />
        <StockChart />
      </div>
    );
  }
}
export default SocialMedia;
