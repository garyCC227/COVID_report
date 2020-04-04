import React, { Component } from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import AlertSearchBar from './AlertSearchBar';
import Temp from './Temp';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";


import {
    StaticGoogleMap,
    Marker,
    Path,
  } from 'react-static-google-map';


  // To Do
  // Css, Call real API from group Pigeons, Pass those data chart
  // customized marker on the map, compare function

export default class Alerts extends React.Component {
    constructor(){
        super();
    }
    render() {
        let styleobj = { font: "helvetica", fontSize: 35 , fontWeight: "bold"}
        return (
            <div>
                <br />
                <AlertSearchBar/>
                <br />
                <PieChart/>
                <br />
                <FormGroup style={{display: 'flex', flexDirection: 'row'}}>
                <b style = {styleobj}>Display Disease: </b>
                <FormControlLabel
                    control={<Checkbox  name="gilad" checked= "true"/>}
                    label="All"
                />
                <FormControlLabel
                    control={<Checkbox  name="jason" checked= "true"/>}
                    label="Coronavirus"
                />
                <FormControlLabel
                    control={<Checkbox  name="antoine"/>}
                    label="H1N5"
                />
                <FormControlLabel
                    control={<Checkbox  name="antoine" />}
                    label="Zika"
                />
                <FormControlLabel
                    control={<Checkbox  name="antoine" checked= "true"/>}
                    label="Other"
                />
            </FormGroup>
                <LineChart/>
                <br />
                <Temp/>
                <br />
                <div>
                    <b style = {styleobj}>Outbreak Location</b>
                </div>
                <StaticGoogleMap region = "AU" scale = "2" size="400x300" apiKey="AIzaSyCZAhgGJq-k2ixG-fX-wbkUqbVaR8-WkR0" center = "AU">
                    <Marker.Group label="T" color="red" size="small">
                        <Marker location="Perth" />
                        <Marker location="Sydney" />
                        <Marker location="Gold Coast" />
                        <Marker location="Melbourn"/>
                        <Marker location="Central Coast"/>
                    </Marker.Group>
                    <Marker.Group label="T" color="blue" size="small">
                        <Marker location="Perth" />
                        <Marker location="Aldelaide" />
                    </Marker.Group>
                    <Marker.Group label="T" color="green" size="small">
                        <Marker location="Alice Spring" />
                    </Marker.Group>
                </StaticGoogleMap>
                <br/>
                <Button variant="contained" color="primary" type="submit">
                 Compare two country
                </Button>
            </div>
        );
      }
}