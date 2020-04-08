/* App.js */
import React from "react";
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class LineChart extends React.Component {
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
                    name: "All Cases",
                    showInLegend: true,
                    markerSize: 10,
                    dataPoints: [
                        { x: new Date("2020-03-28"), y: 13 },
                        { x: new Date("2020-03-29"), y: 28 },
                        { x: new Date("2020-03-30"), y: 49},
                        { x: new Date("2020- 03- 31"), y: 65 },
                        { x: new Date("2020- 04- 01"), y: 85 },
                        { x: new Date("2020- 04- 02"), y: 107 },
                        { x: new Date("2020-04- 03"), y: 148 }
                    ]
                },
                {
                type: "line",
                axisYType: "secondary",
                name: "Coronavirus Cases",
                showInLegend: true,
                markerSize: 10,
                dataPoints: [
                    { x: new Date("2020-03-28"), y: 11 },
                    { x: new Date("2020-03-29"), y: 26 },
					{ x: new Date("2020-03-30"), y: 46},
                    { x: new Date("2020- 03- 31"), y: 62 },
                    { x: new Date("2020- 04- 01"), y: 81 },
					{ x: new Date("2020- 04- 02"), y: 98 },
					{ x: new Date("2020-04- 03"), y: 123 }
                ]
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Other",
                showInLegend: true,
                markerSize: 10,
                dataPoints: [
                    { x: new Date("2020-03-28"), y: 1 },
                    { x: new Date("2020-03-29"), y: 3 },
					{ x: new Date("2020-03-30"), y: 6},
                    { x: new Date("2020- 03- 31"), y: 6 },
                    { x: new Date("2020- 04- 01"), y: 6 },
					{ x: new Date("2020- 04- 02"), y: 6 },
					{ x: new Date("2020-04- 03"), y: 7 }
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
