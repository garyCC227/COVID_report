import React, { Component } from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import AlertSearchBar from './AlertSearchBar';
import LineChart2 from './LineChart2';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


import {
  StaticGoogleMap,
  Marker,
  Path,
} from 'react-static-google-map';
import { Typography, Grid } from '@material-ui/core';


export default class AlertsSingleCountry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start_date : this.props.start_date,
            end_date : this.props.end_date,
            country : this.props.country,
            display_total : true,
            second_country : "", // reserved for comparasion
            diseases : [],
            diseases_second : [] // reserved for comparasion
        }
        this.fetch_disease = this.fetch_disease.bind();
        this.create_form_label = this.create_form_label.bind();
        this.map_name = this.map_name.bind();
        this.handleTotalCheckBox = this.handleTotalCheckBox.bind();
        this.handleNormalCheckBox = this.handleNormalCheckBox.bind();
    }

    handleNormalCheckBox = (e) => {
      var new_data = this.state.diseases;
      new_data[e.target.value]["is_checked"] = e.target.checked;
      this.setState({diseases: new_data});
    }

    handleTotalCheckBox = () => {
      if (this.state.display_total) {
        this.setState({display_total : false});
      } else {
        this.setState({display_total : true});
      }
    }

    // Disease name mapping hash function
    map_name = (name) => {
      if (name === "African Swine Fever / Swine Fever" ) {
        name = "African Swine Fever";
      } else if (name == "Swine Flu - Confirmed / Possible Related Death") {
        name = "Swine Flu Death";
      } else if (name == "Swine Flu - Suspected or Probable Cases") {
        name = "Suspected Swine Flu";
      } else if (name == "Dengue / Hemorrhagic Fever") {
        name = "Hemorrhagic Fever";
      } else if (name == "H7N9 / H5N1 / H5N2 / H7N1 / H7N3 / H7N7 / H5N8") {
        name = "Avian influenza"
      }
      return name;
    }

    create_form_label = (key,i) => {
        return  <FormControlLabel
              control={<Checkbox name="antoine" value = {i} checked={key["is_checked"]} color="primary" onClick = {this.handleNormalCheckBox}/>}
              label={key.Name}
        />
    }

    fetch_disease = async () => {
        const url =
          "http://ken.crestruction.org:8000/user/epidemicInfo";
        var country_name = this.state.country;
        if (country_name == "global" || country_name == "Global") {
            country_name = "None";
        }
        const lists = await fetch(url, {
          method: "POST",
          headers: {"accept": "application/json",
                    "Content-Type": "application/json" },
          body: JSON.stringify({
            "key_terms": "None",
            "country": country_name,
            "location": "None",
            "A_start_date": this.state.start_date + "T00:00:01",
            "An_end_date": this.state.end_date + "T23:59:59"
          })
        })
          .then(res => {
            // console.log(res.json());
            return res.json();
          })
        if (lists["Message"]) {
          this.setState({diseases : []})
        } else {
          const diseases = lists.filter((key) => key["Name"] !== "General News").map((key,i) => {
            var checked = false;
            if (i < 3) {
              checked = true;
            }
            return {"Name" : this.map_name(key["Name"]), "Cases" : key["Cases"], "is_checked" : checked};
          })
          this.setState({diseases : diseases})
        }
        console.log("fetch new result")
      };

    componentDidMount() {
        this.fetch_disease();
    }

    
    componentDidUpdate(prevProps, prevState) {
      
      // console.log("bbb")
      // console.log(prevProps)
      // console.log(prevState)
      // console.log(this.state)
      if (prevState.start_date !== this.state.start_date || prevState.end_date !== this.state.end_date || prevState.country !== this.state.country) {
        this.fetch_disease();
      }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.start_date != nextProps.start_date || this.props.end_date != nextProps.end_date || this.props.country != nextProps.country) {
            this.setState({start_date : nextProps.start_date,
                end_date : nextProps.end_date,
                country : nextProps.country});
        }
      }

    render() {
        let styleobj = { font: "helvetica", fontSize: 35, fontWeight: "bold" }
        return (
          <div >
            <Divider />
            <br />
            <Typography variant="h5">
              Outbreaks
            </Typography>
            <PieChart data_list = {this.state.diseases} country = {this.state.country}/>
            <br />
            <Divider />
            <br />
            <FormGroup row>
              {this.state.diseases.map((key,i) => this.create_form_label(key,i))}
              <FormControlLabel
                control={<Checkbox name="antoine" checked={this.state.display_total} color="primary" onClick = {this.handleTotalCheckBox}/>}
                label="Total"
              />
            </FormGroup>
            <Typography variant="h5">
              Accumulated Cases
            </Typography>
            <LineChart data_list = {this.state.diseases} display_total = {this.state.display_total}/>
            <br />
            <Divider />
            <br />
            <Typography variant="h5">
              New Cases
            </Typography>
            <LineChart2 data_list = {this.state.diseases} display_total = {this.state.display_total}/>
            <br />
            <Divider />
            <br />
            <Typography variant="h5">
              Outbreak Location
            </Typography>
            <StaticGoogleMap region="AU" scale="2" size="350x350" apiKey="AIzaSyCZAhgGJq-k2ixG-fX-wbkUqbVaR8-WkR0" center="AU">
              <Marker.Group label="T" color="red" size="tiny">
                <Marker location="Perth" />
                <Marker location="Sydney" />
                <Marker location="Gold Coast" />
                <Marker location="Melbourn" />
                <Marker location="Central Coast" />
              </Marker.Group>
              <Marker.Group label="T" color="blue" size="tiny">
                <Marker location="Perth" />
                <Marker location="Aldelaide" />
              </Marker.Group>
              <Marker.Group label="T" color="green" size="tiny">
                <Marker location="Alice Spring" />
              </Marker.Group>
            </StaticGoogleMap>
            <br />
            <br />
            <br />
            <br />
          </div >
        );
      }

}