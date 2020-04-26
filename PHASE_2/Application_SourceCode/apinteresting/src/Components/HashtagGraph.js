import React from "react";
import CanvasJSReact from './canvasjs.react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Typography} from '@material-ui/core';
import Button from "@material-ui/core/Button";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var request = require("request");
export default class HashtagGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            diseases : [
            {   "name" : "Coronavirus",
                "is_checked" : true,
                "history": [
                {
                    "popularity": 86.5,
                    "weeks_ago": 0
                },
                {
                    "popularity": 94.9,
                    "weeks_ago": 1
                },
                {
                    "popularity": 96,
                    "weeks_ago": 2
                },
                {
                    "popularity": 96.8,
                    "weeks_ago": 3
                },
                {
                    "popularity": 99.1,
                    "weeks_ago": 4
                },
                {
                    "popularity": 100,
                    "weeks_ago": 5
                },
                {
                    "popularity": 100,
                    "weeks_ago": 6
                },
                {
                    "popularity": 95.3,
                    "weeks_ago": 7
                }
            ]},
            {   "name" : "Ebola",
                "is_checked" : true,
                "history": [
                {
                    "popularity": 33.9,
                    "weeks_ago": 0
                },
                {
                    "popularity": 36.4,
                    "weeks_ago": 1
                },
                {
                    "popularity": 39.4,
                    "weeks_ago": 2
                },
                {
                    "popularity": 36.1,
                    "weeks_ago": 3
                },
                {
                    "popularity": 37.8,
                    "weeks_ago": 4
                },
                {
                    "popularity": 35.8,
                    "weeks_ago": 5
                },
                {
                    "popularity": 46.8,
                    "weeks_ago": 6
                },
                {
                    "popularity": 42.1,
                    "weeks_ago": 7
                }
            ]},{"name" : "Cancer",
                "is_checked" : true,
                "history": [
                {
                    "popularity": 44,
                    "weeks_ago": 0
                },
                {
                    "popularity": 54,
                    "weeks_ago": 1
                },
                {
                    "popularity": 52.7,
                    "weeks_ago": 2
                },
                {
                    "popularity": 52.2,
                    "weeks_ago": 3
                },
                {
                    "popularity": 49.5,
                    "weeks_ago": 4
                },
                {
                    "popularity": 50.5,
                    "weeks_ago": 5
                },
                {
                    "popularity": 47,
                    "weeks_ago": 6
                },
                {
                    "popularity": 51.1,
                    "weeks_ago": 7
                }]
            }
        ]
        }


        this.handleNormalCheckBox = this.handleNormalCheckBox.bind();
        this.create_form_label = this.create_form_label.bind();
        //this.add_tag = this.add_tag.bind();
    }


    handleNormalCheckBox = (e) => {
        var new_data = this.state.diseases;
        new_data[e.target.value]["is_checked"] = e.target.checked;
        this.setState({diseases: new_data});
      }

    create_form_label = (key,i) => {
        return  <FormControlLabel
              control={<Checkbox name="antoine" value = {i} checked={key["is_checked"]} color="primary" onClick = {this.handleNormalCheckBox}/>}
              label={key["name"]}
        />
    }


    // add_tag = (e) => {
    //     const url = 'https://api.hashtagify.me/1.0/tag/flu';
    //     const lists = fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'mode': "no-cors",
    //             'cache-control': 'no-cache',
    //             'authorization': 'Bearer 9b932c3d4ac124a34da4f8d3bfa3e9c70c9c015c'
    //           }
    //         mode : "no-cors",
    //       }).then(res => res.json())
    //         .then(res => {
    //             console.log(res)
    //         })
    //     // var options = {
    //     //     method: 'GET',
    //     //     url: 'https://api.hashtagify.me/1.0/tag/flu',
    //     //     headers: {
    //     //       'mode': "no-cors",
    //     //       'cache-control': 'no-cache',
    //     //       'authorization': 'Bearer 9b932c3d4ac124a34da4f8d3bfa3e9c70c9c015c'
    //     //     }
    //     //   };
    //     //   var response;
    //     //   request(options, function (error, response, body) {
    //     //     if (error) throw new Error(error);
          
    //     //     console.log(JSON.parse(body));
    //     //     console.log(JSON.parse(response));
    //     //   });
    // }

    render() {
        const data = this.state.diseases.filter(key => key["is_checked"]).map((key) => {
            return {
                type: "splineArea",
				xValueFormatString: "YYYY-MM-DD",
                showInLegend: true,
                name: key["name"],
                dataPoints: key["history"].map((k) => {
                    var date = new Date();
                    date.setDate(date.getDate() - k["weeks_ago"]*7);
                    return {
                        x : date, y:k["popularity"]
                    }
                })
            };
        });
        const options = {
			animationEnabled: true,
			title: {
				text: "Disease Twitter Hashtag Trend"
			},
			axisY: {
                title: "Popularity level",
                maximum: 100,
				includeZero: true
			},
			data: data
		}
        return ( <div>
            <FormGroup row >
            <Typography variant="h5" style = {{margin : "10px"}}>
              Display on graph:     
            </Typography>
            {/* <Button variant="contained" color="primary" onClick = {this.add_tag} style={{ minWidth: '90px', minHeight: '20px', fontSize: '18px'}}>
            Go
          </Button> */}
              {this.state.diseases.map((key,i) => this.create_form_label(key,i))}
            </FormGroup>
                <CanvasJSChart options = {options}/>
            </div>);
    }
}