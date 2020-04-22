import React, { Component } from 'react';
import GoogleTrendChart from './GoogleTrendChart.js'
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";

class SocialMedia extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader color="info">
            <h2>Google Trends</h2>
          </CardHeader>
          <CardBody />
        </Card>
        <GoogleTrendChart />
      </div>
    );
  }
}
export default SocialMedia;
