import React, { Component } from 'react';
import {
    StaticGoogleMap,
    Marker,
    Path,
  } from 'react-static-google-map';
import { Label } from 'semantic-ui-react'

export default class AlertMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            country : this.props.country,
            data_list : this.props.data_list,
            state_id : this.props.state_id,
            colours : ["blue", "red", "green", "purple", "yellow", "ltblue", "pink", "orange"],
            marker_group : <Marker location = "50,50"/>
        }
        this.create_marker_group = this.create_marker_group.bind();
        this.create_marker = this.create_marker.bind();
        this.renderMarkers = this.renderMarkers.bind();
        this.createLable = this.createLable.bind();
    }

    // static getDerivedStateFromProps(nextProps, prevState){
    //     console.log(nextProps.data_list);
    //     console.log(prevState.data_list);
    //     if(nextProps.data_list!==prevState.data_list || nextProps.country!==prevState.country){
    //       return { data_list: nextProps.data_list,
    //                 country:  nextProps.country};
    //    }
    //    else return null;
    //  }

    createLable = (key,i) => {
        return (
          <Label as='a' image>
            <img src={"https://maps.gstatic.com/mapfiles/ms2/micons/" + this.state.colours[i] + "-dot.png"} />
            {key["Name"]}
          </Label>     
        )
    }

    componentDidMount() {
        console.log("Hi");
        this.renderMarkers();
      }


      
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.state_id!== this.props.state_id) {
          console.log("update disease");
          this.renderMarkers();
          return;
        }
      }

    renderMarkers = async () => {
        try {
          const temp = await Promise.all(this.state.data_list.filter(key => key["is_checked"]).map((key,i) => this.create_marker_group(key,i)));
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
          return <Marker location = {loc}/>
        }
        console.log(data["status"]);
        await new Promise(r => setTimeout(r, 500));
        return <Marker location = {this.state.country}/>
      }
  
      create_marker_group = async  (key,i) => {
        const url = "https://maps.gstatic.com/mapfiles/ms2/micons/" + this.state.colours[i] + "-dot.png";
        const temp = key["Cases"].filter((key,i) => {
          if (this.state.country == "Global" || this.state.country == "global") {
            if (i < 10) {
              return true;
            } else {
              return i%8 == 0;
            }
          }
          return true;
        }).map(k =>  this.create_marker(k));
        const markers = await Promise.all(temp);
        return <Marker.Group label="T" size="tiny"  iconURL = {url}>
          {markers}
      </Marker.Group>
      }

    render() {
        var country_name = this.state.country;
        if (this.state.country == "Global" || this.state.country == "global") {
            country_name = "0,0"
        }
        return (
        <div>
        {this.state.data_list.filter(key => key["is_checked"]).map((key,i) => this.createLable(key,i))}
        <br/>
        <StaticGoogleMap size="650x650" apiKey="AIzaSyCZAhgGJq-k2ixG-fX-wbkUqbVaR8-WkR0" center = {country_name}>
            {this.state.marker_group}
        </StaticGoogleMap>
        </div>
        );
    }
}