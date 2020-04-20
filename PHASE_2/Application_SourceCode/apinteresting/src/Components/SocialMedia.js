import React, { Component } from 'react';
import CardHeader from './Style/CardHeader.js'
import { Typography, Grid } from '@material-ui/core';
import StockChart from './StockChart.js';



class SocialMedia extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div>
      <Typography variant="h5">
      Google Trend Chart
      </Typography>
      <Typography variant="h5">
        <StockChart />
      </Typography>
      </div>
    );
  }
}
export default SocialMedia;
