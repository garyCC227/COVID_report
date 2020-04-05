import React, { Component } from 'react';
import CardHeader from './Style/CardHeader.js'
import { Typography, Grid } from '@material-ui/core';



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
      Stock Price Chart
      </Typography>
      <Typography variant="h5">
      Concurrency Chart
      </Typography>
      </div>
    );
  }
}
export default SocialMedia;
