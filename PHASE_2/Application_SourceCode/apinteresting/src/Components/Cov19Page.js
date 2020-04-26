import React, { Component } from 'react';
import PieChart from './Piechart1.js'
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import Cov19Table from './Cov19Table.js'
import GoogleTrendsPage from './GoogleTrendsPage.js'
import GoogleTrendsChart from './GoogleTrendsChart.js'
import { Paper, Box } from "@material-ui/core";
import TrendQuestionCov19 from './TrendQuestionCov19.js'
import CovSearchTrend from './CovSearchTrend.js'
import DiseaseTopicTrend from './DiseaseTopicTrend.js'

class Cov19Page extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class="w3-display-container">
        <div class="w3-left" style={{'width':'70%'}}>
          <Card>
            <CardHeader color="danger">
              <h2>COV-19 Statistics</h2>
            </CardHeader>
            <CardBody>
            <div class="w3-container">
              <Cov19Table />
            </div>
            </CardBody>
          </Card>
        <br/>
        <br/>

        <Card>
          <CardHeader color="danger">
            <h2>Google Trends on 'Cov-19'</h2>
          </CardHeader>
          <CardBody />
        </Card>

        <Box my={1}>
          <Paper>
            <Box p={3}>
              <GoogleTrendsChart />
            </Box>
          </Paper>
        </Box>

        <Box my={1}>
          <Paper>
            <Box p={3}>
              <CovSearchTrend />
            </Box>
          </Paper>
        </Box>

        <Box my={1}>
          <Paper>
            <Box p={3}>
              <TrendQuestionCov19 />
            </Box>
          </Paper>
        </Box>
        </div>


        <div class="w3-right" style={{'width':'28%'}}>
          <GoogleTrendsPage/>
        </div>
      </div>
    );
  }
}
export default Cov19Page;
