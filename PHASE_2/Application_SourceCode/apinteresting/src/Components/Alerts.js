import React, { Component } from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import AlertSearchBar from './AlertSearchBar';
import Temp from './LineChart2';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import CardHeader from './Style/CardHeader.js'
import GridItem from "./Style/GridItem.js";
import GridContainer from "./Style/GridContainer.js";

import {
  StaticGoogleMap,
  Marker,
  Path,
} from 'react-static-google-map';
import { Typography, Grid } from '@material-ui/core';
import AlertsSingleCountry from './AlertsSingleCountry';


// To Do
// Css, Call real API from group Pigeons, Pass those data chart
// customized marker on the map, compare function

export default class Alerts extends React.Component {
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
      // TODO: FIXME: Hard-coded
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
    console.log("aaa")
    return (
      <div >
        <CardHeader color="primary">
          <h2>Alerts</h2>
          <Box m={1}>
            <List style={{
              root: {
                width: '100%',
              },
            }}> {this.state.articles.map((item, index) => {
              //console.log(item)
              return (
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <div>
                        <Link href={item.url} color="inherit">
                          <h3>{item.title}</h3>
                        </Link>
                      </div>
                    }
                    secondary={
                      <React.Fragment>
                        {item.publishedAt}
                        <br />
                        <span style={{ color: '#000', }}>{item.content}</span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              )
            })
              }
            </List>
          </Box >
        </CardHeader>
        <AlertSearchBar start_date={this.state.start_date} end_date={this.state.end_date}
          country={this.state.country} onSubmit={this.update_search_query} />
        <Divider />
        <br />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
        </Grid>
        <br />
        <AlertsSingleCountry start_date={this.state.start_date} end_date={this.state.end_date}
          country={this.state.country} />
      </div >
    );
  }
}
