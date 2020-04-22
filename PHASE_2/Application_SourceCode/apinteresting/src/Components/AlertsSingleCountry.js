import React, { Component } from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import AlertMap from './AlertMap';
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

import Loader from 'react-loader-spinner'

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
            loading: true,
            second_country : "", // reserved for comparasion
            diseases : [],
            diseases_second : [], // reserved for comparasion
            colours : ["blue", "red", "green", "purple", "yellow", "ltblue", "pink", "orange"],
            marker_group : [],
            state_id: 0
        }
        this.fetch_disease = this.fetch_disease.bind();
        this.create_form_label = this.create_form_label.bind();
        this.map_name = this.map_name.bind();
        this.handleTotalCheckBox = this.handleTotalCheckBox.bind();
        this.handleNormalCheckBox = this.handleNormalCheckBox.bind();
        this.create_marker_group = this.create_marker_group.bind();
        this.create_marker = this.create_marker.bind();
        this.renderMarkers = this.renderMarkers.bind();
    }

    handleNormalCheckBox = (e) => {
      var new_data = this.state.diseases;
      new_data[e.target.value]["is_checked"] = e.target.checked;
      var id = this.state.state_id + 1;
      this.setState({diseases: new_data,
        state_id : id});
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

    renderMarkers = async () => {
      try {
        const temp = await Promise.all(this.state.diseases.map((key,i) => this.create_marker_group(key,i)));
        this.setState({
          marker_group: temp
        });
      } catch (err) {
        console.log(err);
      }
    }

    create_marker = async (key) => {
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + key["City"] + "," + key["Country"] + "&key=AIzaSyCZAhgGJq-k2ixG-fX-wbkUqbVaR8-WkR0";
      const data = await fetch(url).then(res => res.json());
      if (data["status"] == "OK") {
        const lat = data["results"][0]["geometry"]["location"]["lat"] + Math.random()/2 -0.25;
        const lng = data["results"][0]["geometry"]["location"]["lng"] + Math.random()/2 -0.25;
        const loc = lat.toString() + "," + lng.toString();
        console.log("success");
        return <Marker location = {loc}/>
      }
      console.log(data["status"]);
      await new Promise(r => setTimeout(r, 500));
      return <Marker location = "Shanghai, China"/>
    }

    create_marker_group = async  (key,i) => {
      const url = "https://maps.gstatic.com/mapfiles/ms2/micons/" + this.state.colours[i] + "-dot.png";
      const temp = key["Cases"].filter((key,i) => {
        if (this.state.country == "Global" || this.state.country == "global") {
          if (i < 6) {
            return true;
          } else {
            return i%10 == 0;
          }
        }
        return true;
      }).map(k =>  this.create_marker(k));
      const markers = await Promise.all(temp);
      return <Marker.Group label="T" size="tiny"  iconURL = {url}>
        {markers}
    </Marker.Group>
    }

    create_form_label = (key,i) => {
        return  <FormControlLabel
              control={<Checkbox name="antoine" value = {i} checked={key["is_checked"]} color="primary" onClick = {this.handleNormalCheckBox}/>}
              label={key.Name}
        />
    }

    fetch_disease = async () => {
        this.setState({loading: true});
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
          this.setState({diseases : []});
          // this.renderMarkers();
        } else {
          const diseases = lists.filter((key) => key["Name"] !== "General News").map((key,i) => {
            var checked = false;
            if (i < 3) {
              checked = true;
            }
            return {"Name" : this.map_name(key["Name"]), "Cases" : key["Cases"], "is_checked" : checked};
          })
          this.setState({diseases : diseases});
          // this.renderMarkers();
        }
        console.log("fetch new result");
        this.setState({loading: false});
      };

    componentDidMount() {
      this.fetch_disease();
    }

    test = async () => {
      await this.fetch_disease();
    }
    
    componentDidUpdate(prevProps, prevState) {
      
      // console.log("bbb")
      // console.log(prevProps)
      // console.log(prevState)
      // console.log(this.state)
      if (prevState.start_date !== this.state.start_date || prevState.end_date !== this.state.end_date || prevState.country !== this.state.country) {
        this.fetch_disease()
        return ;
      }
      if (prevState.diseases !== this.state.diseases ) {
        console.log("update disease")
        // this.renderMarkers();
        return;
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
        let styleobj = { font: "helvetica", fontSize: 35, fontWeight: "bold" };
        const loading = this.state.loading;
        return (
          <div >
            {loading ? 

            <Loader
            type="Bars"
            color="#00BFFF"
            height={170}
            width={350}
            /> 
            : 
            <div>
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
            <AlertMap data_list = {this.state.diseases} country = {this.state.country} state_id = {this.state.state_id}/>
            <br />
            <br />
            <br />
            <br />
            </div>
            }
          </div >
        );
      }

}