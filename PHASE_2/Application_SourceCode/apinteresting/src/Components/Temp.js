/* App.js */
import React from "react";
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Temp extends React.Component {
	render() {
		const options = {
            animationEnabled: true,
            animationDuration: 1000,
			exportEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
                verticalAlign: "top", // "top", "center", "bottom"
                horizontalAlign: "left", // "left", "right", "center"
                font: "helvetica",
                fontWeight: "bold",
                fontSize: "35"
			},
			axisY2: {
                title: "Cases"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                horizontalAlign: "center",
                dockInsidePlotArea: true
            },
            data: [{
                type: "line",
                axisYType: "secondary",
                name: "Coronavirus Cases",
                showInLegend: true,
                markerSize: 10,
                dataPoints: [
                    { x: new Date("2020-03-28"), y: 11 },
                    { x: new Date("2020-03-29"), y: 13 },
					{ x: new Date("2020-03-30"), y: 20},
                    { x: new Date("2020- 03- 31"), y: 16 },
                    { x: new Date("2020- 04- 01"), y: 19 },
					{ x: new Date("2020- 04- 02"), y: 17 },
					{ x: new Date("2020-04- 03"), y: 25 , indexLabel: "peak", markerType: "triangle",  markerColor: "#6B8E23"}
                ]
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "All Cases",
                showInLegend: true,
                markerSize: 10,
                dataPoints: [
                    { x: new Date("2020-03-28"), y: 13 },
                    { x: new Date("2020-03-29"), y: 15 },
					{ x: new Date("2020-03-30"), y: 21 },
                    { x: new Date("2020- 03- 31"), y: 16 },
                    { x: new Date("2020- 04- 01"), y: 20 },
					{ x: new Date("2020- 04- 02"), y: 22 },
					{ x: new Date("2020-04- 03"), y: 26 , indexLabel: "peak", markerType: "triangle",  markerColor: "#6B8E23"}
                ]
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Dengue",
                showInLegend: true,
                markerSize: 10,
                dataPoints: [
                    { x: new Date("2020-03-28"), y: 1 },
                    { x: new Date("2020-03-29"), y: 2 },
					{ x: new Date("2020-03-30"), y: 3 , indexLabel: "peak", markerType: "triangle",  markerColor: "#6B8E23"},
                    { x: new Date("2020- 03- 31"), y: 0 },
                    { x: new Date("2020- 04- 01"), y: 0 },
					{ x: new Date("2020- 04- 02"), y: 0 },
					{ x: new Date("2020-04- 03"), y: 1 }
                ]
            }]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}