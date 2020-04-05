import React, { Component } from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import AlertSearchBar from './AlertSearchBar';
import Temp from './Temp';
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


// To Do
// Css, Call real API from group Pigeons, Pass those data chart
// customized marker on the map, compare function

export default class Alerts extends React.Component {
  constructor(props) {
    super(props);

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
      }
    }

    this.toggleDisplay = this.toggleDisplay.bind(this)
  }

  toggleDisplay(disease) {
    const displayState = { ...this.state.display }
    displayState[disease] = !displayState[disease]
    this.setState({ display: displayState })
  }

  componentDidMount = () => {
    console.log("Mounted")

    // TO DO
    // Currently this is calling from google news api for category
    //health, waiting to change to other api if needed
    var url = 'http://newsapi.org/v2/top-headlines?' +
      'category=health&' +
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
    let styleobj = { font: "helvetica", fontSize: 35, fontWeight: "bold" }
    return (
      <div >
        <CardHeader color="danger">
          <h2>Alerts</h2>
          <p>
            <a target="_blank" >
              Outbreak Alerts from Google News
            </a>
          </p>
        </CardHeader>
        <AlertSearchBar />
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
        <Divider />
        <br />
        <Typography variant="h5">
          Outbreaks
        </Typography>
        <PieChart />
        <br />
        <Divider />
        <br />
        <FormGroup row>
            <FormControlLabel
              control={<Checkbox name="gilad" checked="true" color="primary" />}
              label="Total"
            />
            <FormControlLabel
              control={<Checkbox name="jason" checked="true" color="primary" />}
              label="Coronavirus"
            />
            <FormControlLabel
              control={<Checkbox name="antoine" color="primary" />}
              label="Swine Fever"
            />
            <FormControlLabel
              control={<Checkbox name="antoine" color="primary" />}
              label="Zika"
            />
            <FormControlLabel
              control={<Checkbox name="antoine" checked="true" color="primary"  />}
              label="Dengue"
            />
            <FormControlLabel
              control={<Checkbox name="antoine" color="primary"  />}
              label="Lassa Fever"
            />
            <FormControlLabel
              control={<Checkbox name="antoine" color="primary"   />}
              label="Hantavirus"
            />
          </FormGroup>
        <Typography variant="h5">
          Accumulated Cases
        </Typography>
        <LineChart />
        <br />
        <Divider />
        <br />
        <Typography variant="h5">
          New Cases
        </Typography>
        <Temp />
        <br />
        <Divider />
        <br />
        <Typography variant="h5">
          Outbreak Location
        </Typography>
        <StaticGoogleMap region="AU" scale="2" size="350x350" apiKey="AIzaSyCZAhgGJq-k2ixG-fX-wbkUqbVaR8-WkR0" center="AU">
          <Marker.Group label="T" color="red" size="small">
            <Marker location="Perth" />
            <Marker location="Sydney" />
            <Marker location="Gold Coast" />
            <Marker location="Melbourn" />
            <Marker location="Central Coast" />
          </Marker.Group>
          <Marker.Group label="T" color="blue" size="small">
            <Marker location="Perth" />
            <Marker location="Aldelaide" />
          </Marker.Group>
          <Marker.Group label="T" color="green" size="small">
            <Marker location="Alice Spring" />
          </Marker.Group>
        </StaticGoogleMap>
        <br />
        <br />
        <br />
        <br />
        {/* <CardHeader color="info">
                  <h2>Health Care</h2>
                  <p>
                  <a target="_blank" >
                  Prevent From disease
                  </a>
                  </p>
                </CardHeader>
                <Box m ={1}>
                  <List style={{
                      root: {
                          width: '100%',
                          },
                      }}>
                      {this.state.articles.map((item, index) => {
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
                              <span> - </span>
                              <Link>{item.url}</Link>
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
                  </Box > */}
      </div >
    );
  }
}
