import React, { Component } from 'react';
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import { Paper, Box } from "@material-ui/core";
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
      </div>
    );
  }
}
export default GoogleTrendsPage;
