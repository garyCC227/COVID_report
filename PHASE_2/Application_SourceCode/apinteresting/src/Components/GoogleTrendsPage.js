import React, { Component } from 'react';
import GoogleTrendsChart from './GoogleTrendsChart.js'
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import { Paper, Box } from "@material-ui/core";
import TrendQuestionCov19 from './TrendQuestionCov19.js'
import CovSearchTrend from './CovSearchTrend.js'
import DiseaseTopicTrend from './DiseaseTopicTrend.js'
import TwitterTag from './TwitterTag.js'

class GoogleTrendsPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader color="info">
            <h2>Google Trends on 'Disease'</h2>
          </CardHeader>
          <CardBody>
          <Box my={1}>

              <Box p={3}>
                <DiseaseTopicTrend />
              </Box>

          </Box>
          </CardBody>
        </Card>

        {/* TODO: Yahnis can move this to twitter page  */}
        <Card style={{'width':'50%'}}>
          <CardHeader color="info">
            <h2>Twitter Tag</h2>
          </CardHeader>
          <CardBody>
          <Box my={1}>

              <Box p={3}>
                <TwitterTag/>
              </Box>

          </Box>
          </CardBody>
        </Card>
        {/* end move */}

      </div>
    );
  }
}
export default GoogleTrendsPage;
