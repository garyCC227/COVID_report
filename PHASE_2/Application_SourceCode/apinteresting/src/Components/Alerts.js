import React, { Component } from 'react';
import AlertSearchBar from './AlertSearchBar';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import CardHeader from './Style/CardHeader.js'
import Card from "./Style/Card.js";
import CardBody from "./Style/CardBody.js";

import { Typography, Grid } from '@material-ui/core';
import AlertsSingleCountry from './AlertsSingleCountry';


// To Do
// Css, Call real API from group Pigeons, Pass those data chart
// customized marker on the map, compare function

export default class Alerts extends Component {
  constructor(props) {
    super(props);

    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    const todayString = `${yyyy}-${mm}-${dd}`;

    today.setDate(today.getDate() - 7);
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0');
    yyyy = today.getFullYear();
    const previousString = `${yyyy}-${mm}-${dd}`;
    console.log(previousString);

    this.state = {
      articles: [],
      diseases: [
        "Total",
        "Coronavirus",
        "H1N5",
        "Zika",
        "Other",
      ],
      display: {
        "Total": false,
        "Coronavirus": false,
        "H1N5": false,
        "Zika": false,
        "Other": false,
      },
      start_date: previousString,
      end_date: todayString,
      country: "Global"
    }

    this.toggleDisplay = this.toggleDisplay.bind(this)
    this.update_search_query = this.update_search_query.bind(this)
  }

  toggleDisplay(disease) {
    const displayState = { ...this.state.display }
    displayState[disease] = !displayState[disease]
    this.setState({ display: displayState })
  }

  update_search_query(state) {
    this.setState({
      start_date: state.start_date,
      end_date: state.end_date,
      country: state.country
    });
  }

  componentDidMount = () => {
    console.log("Mounted")
    // TO DO
    // Currently this is calling from google news api for category
    //health, waiting to change to other api if needed
    var url = 'http://newsapi.org/v2/everything?' +
      'q=outbreak&' +
      'sortBy=popularity&' +
      'pageSize=5&' +
      'apiKey=cd9567c0810a4be09ec8558e5733d54c';
    var req = new Request(url);
    var alerts = new Array();

    fetch(req)
      .then(res => res.json())
      .then(res => res.articles)
      .then(res => {
        //    this.setState({articles: newAlerts})
        //    console.log("state", this.state.articles);
        this.setState({ articles: res })
        //console.log(res)
        // this.addAlerts(res)
      });
  }

  render() {
    return (
      <div >
        <Card>
          <CardHeader color="primary">
            <h2>Outbreak Statistics</h2>
          </CardHeader>
          <CardBody />
        </Card>
        <AlertSearchBar
          start_date={this.state.start_date}
          end_date={this.state.end_date}
          country={this.state.country}
          onSubmit={this.update_search_query}
        />
        <Divider />
        <br />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        />
        <br />
        <AlertsSingleCountry
          start_date={this.state.start_date}
          end_date={this.state.end_date}
          country={this.state.country}
        />
      </div>
    );
  }
}
