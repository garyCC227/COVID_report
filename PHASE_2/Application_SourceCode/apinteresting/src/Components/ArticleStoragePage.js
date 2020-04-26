import React, { Component } from 'react';
import PieChart from './Piechart1.js'
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";


class ArticleStoragePage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader color="warning">
            <h2>Article Storage Overview</h2>
          </CardHeader>
          <CardBody />
        </Card>
        <div className="w3-container">
          <h2 className="w3-center"> <b>Disease Articles in Database</b></h2>
          <PieChart />
        </div>
      </div>
    );
  }
}
export default ArticleStoragePage;
