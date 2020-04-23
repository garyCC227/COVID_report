import React, { Component } from 'react';
import GoogleTrendsChart from './GoogleTrendsChart.js'
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import { Paper, Box } from "@material-ui/core";
import TrendQuestionCov19 from './TrendQuestionCov19.js'
import CovSearchTrend from './CovSearchTrend.js'
import DiseaseTopicTrend from './DiseaseTopicTrend.js'

class GoogleTrendsPage extends Component {
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

        <Box my={1}>
          <Paper>
            <Box p={3}>
              <DiseaseTopicTrend />
            </Box>
          </Paper>
        </Box>

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
    );
  }
}
export default GoogleTrendsPage;
