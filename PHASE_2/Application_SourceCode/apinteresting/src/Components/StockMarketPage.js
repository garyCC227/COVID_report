import React, { Component } from 'react';
import StockChart from './StockChart.js';



class StockMarketPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <StockChart />
      </div>
    );
  }
}
export default StockMarketPage;
