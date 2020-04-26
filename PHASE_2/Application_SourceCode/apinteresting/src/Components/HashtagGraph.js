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
            }, { "name" : "Sars",
            "is_checked" : false,
                "history": [
                    {
                        "popularity": 22,
                        "weeks_ago": 0
                    },
                    {
                        "popularity": 39.4,
                        "weeks_ago": 1
                    },
                    {
                        "popularity": 33.8,
                        "weeks_ago": 2
                    },
                    {
                        "popularity": 37.8,
                        "weeks_ago": 3
                    },
                    {
                        "popularity": 30.7,
                        "weeks_ago": 4
                    },
                    {
                        "popularity": 39.5,
                        "weeks_ago": 5
                    },
                    {
                        "popularity": 31.7,
                        "weeks_ago": 6
                    },
                    {
                        "popularity": 29.2,
                        "weeks_ago": 7
                    }]
                
            }, {"name": "Hepatitis",
            "is_checked" : false,
                "history": [
                    {
                        "popularity": 1,
                        "weeks_ago": 0
                    },
                    {
                        "popularity": 6.5,
                        "weeks_ago": 1
                    },
                    {
                        "popularity": 14.6,
                        "weeks_ago": 2
                    },
                    {
                        "popularity": 1,
                        "weeks_ago": 3
                    },
                    {
                        "popularity": 1,
                        "weeks_ago": 4
                    },
                    {
                        "popularity": 16.5,
                        "weeks_ago": 5
                    },
                    {
                        "popularity": 6.3,
                        "weeks_ago": 6
                    },
                    {
                        "popularity": 6.6,
                        "weeks_ago": 7
                    }
                ]},
                {"name": "hiv",
                "is_checked" : false,
                "history": [
                    {
                        "popularity": 29.6,
                        "weeks_ago": 0
                    },
                    {
                        "popularity": 35.2,
                        "weeks_ago": 1
                    },
                    {
                        "popularity": 35.8,
                        "weeks_ago": 2
                    },
                    {
                        "popularity": 38.2,
                        "weeks_ago": 3
                    },
                    {
                        "popularity": 29.6,
                        "weeks_ago": 4
                    },
                    {
                        "popularity": 37.8,
                        "weeks_ago": 5
                    },
                    {
                        "popularity": 35.6,
                        "weeks_ago": 6
                    },
                    {
                        "popularity": 37.5,
                        "weeks_ago": 7
                    }
                ]}, {
                    "name": "zika",
                    "is_checked" : false,
                    "history": [
                        {
                            "popularity": 0,
                            "weeks_ago": 0
                        },
                        {
                            "popularity": 10.2,
                            "weeks_ago": 1
                        },
                        {
                            "popularity": 14.6,
                            "weeks_ago": 2
                        },
                        {
                            "popularity": 9.8,
                            "weeks_ago": 3
                        },
                        {
                            "popularity": 0,
                            "weeks_ago": 4
                        },
                        {
                            "popularity": 16.5,
                            "weeks_ago": 5
                        },
                        {
                            "popularity": 14.7,
                            "weeks_ago": 6
                        },
                        {
                            "popularity": 6.6,
                            "weeks_ago": 7
                        }
                    ]
                }, {
                    "name": "dengue",
                    "is_checked" : false,
                    "history": [
            {
                "popularity": 25.3,
                "weeks_ago": 0
            },
            {
                "popularity": 33.6,
                "weeks_ago": 1
            },
            {
                "popularity": 30.3,
                "weeks_ago": 2
            },
            {
                "popularity": 29.3,
                "weeks_ago": 3
            },
            {
                "popularity": 30.7,
                "weeks_ago": 4
            },
            {
                "popularity": 41.4,
                "weeks_ago": 5
            },
            {
                "popularity": 41.8,
                "weeks_ago": 6
            },
            {
                "popularity": 39.2,
                "weeks_ago": 7
            }
        ]
                }
        ]
        }


        this.handleNormalCheckBox = this.handleNormalCheckBox.bind();
        this.create_form_label = this.create_form_label.bind();
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


    render() {
        const data = this.state.diseases.filter(key => key["is_checked"]).map((key) => {
            return {
                type: "spline",
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
            exportEnabled: true,
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
            <Typography variant="h5" style = {{margin : "20px"}}>
              Display on graph:     
            </Typography>
              {this.state.diseases.map((key,i) => this.create_form_label(key,i))}
            </FormGroup>
                <CanvasJSChart options = {options}/>
            </div>);
    }
}