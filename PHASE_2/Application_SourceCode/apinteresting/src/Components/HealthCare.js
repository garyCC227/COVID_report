import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
import GridItem from "./Style/GridItem.js";
import GridContainer from "./Style/GridContainer.js";
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import SnackbarContent from "./Style/SnackbarContent.js";
import Snackbar from "./Style/Snackbar.js";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import CardAvatar from "./Style/CardAvatar.js";

import hand from "./Hands.jpg";
class HealthCare extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      articles: [],
    }
  }

  componentDidMount = () => {
    var url = 'http://newsapi.org/v2/everything?' +
      'q=health&' +
      'pageSize=10&' +
      'apiKey=cd9567c0810a4be09ec8558e5733d54c';
    var req = new Request(url);
    var alerts = new Array();

    fetch(req)
      .then(res => res.json())
      .then(res => res.articles)
      .then(res => {
        this.setState({ articles: res })
      });
  }

  render(){
    return(
      <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4>HealthCare</h4>
              <p>Things you need to know </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {this.state.articles.map((item, index) => {
                    console.log(item)
                    return (
                      <SnackbarContent message={item.content}>
                      </SnackbarContent>
                    )
                  })}
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a>
                <img src={hand} />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6>Advice to protect yourself</h6>
              <h4>1.Wash your hands frequently</h4>
              <h4>2.Maintain social distancing</h4>
              <h4>3.Avoid touching eyes, nose and mouth</h4>
              <h4>4.If you have fever, cough and difficulty breathing, seek medical care early</h4>
              <h4>5.Stay informed and follow advice given by your healthcare provider</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
    );
  }
}
export default HealthCare;
