import React, { Component } from 'react';
import PieChart from './Piechart1.js'
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import Cov19Table from './Cov19Table.js'


class Cov19Page extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader color="danger">
            <h2>COV-19 Statistics</h2>
          </CardHeader>
          <CardBody />
        </Card>
        <div class="w3-container">
          <Cov19Table />
        </div>
      </div>
    );
  }
}
export default Cov19Page;
