import React from "react";
import CanvasJSReact from './canvasjs.react';
import { object } from "prop-types";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PieChart extends React.Component {
  constructor(){
    super()
    this.state = {ranking:{}}
    this.OnPageLoad = this.OnPageLoad.bind()
  }

  componentDidMount(){
    this.OnPageLoad()
  }

  OnPageLoad = async ()=>{
    var url = `https://apinteresting.xyz/v1/diseases`;
    var rank = await fetch(url, {
      method: "GET",
      headers: { identity: "header" }
    })
      .then(res => {
        // console.log(res.json());
        return res.json();
      })
      .then(res => {
        // // console.log(Array(res.data));
        // const result = Object.entries(rank).map(function(key, value){
        //   return {y:value, label:key}
        // })
        // console.log(res)
        return res.data;
      }).then(data =>{
        var lists = []
        for (var [key, value] of Object.entries(data)){
          lists.push({y:value, label:key})
        }
        return lists
      });
    // console.log(rank.keys())
    this.setState({ranking: rank})
  }


	render() {
    

		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: ""
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y} articles",
				dataPoints: this.state.ranking
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
