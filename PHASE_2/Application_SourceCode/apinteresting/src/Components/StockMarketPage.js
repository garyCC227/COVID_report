import React, { Component } from 'react';
import StockChart from './StockChart.js';
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";


class StockMarketPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader color="danger">
            <h2>Stock Market</h2>
          </CardHeader>
          <CardBody>
            <StockChart />
          </CardBody>
        </Card>

      </div>
    );
  }
}
export default StockMarketPage;
