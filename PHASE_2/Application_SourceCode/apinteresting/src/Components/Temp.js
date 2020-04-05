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
                    { x: new Date("2020- 01- 01"), y: 12 },
                    { x: new Date("2020- 01- 08"), y: 15 },
					{ x: new Date("2020- 02- 20"), y: 15 },
					{ x: new Date("2020- 03- 11"), y: 22 },
					{ x: new Date("2020- 04- 05"), y: 11 },
					{ x: new Date("2020- 05- 04"), y: 8 }
                ]
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "All Cases",
                showInLegend: true,
                markerSize: 10,
                dataPoints: [
                    { x: new Date("2020- 01- 01"), y: 18 },
                    { x: new Date("2020- 01- 08"), y: 19 },
					{ x: new Date("2020- 02- 20"), y: 22 },
					{ x: new Date("2020- 03- 11"), y: 33 },
					{ x: new Date("2020- 04- 05"), y: 28 },
					{ x: new Date("2020- 05- 04"), y: 17 }
                ]
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Other",
                showInLegend: true,
                markerSize: 10,
                dataPoints: [
                    { x: new Date("2020- 01- 01"), y: 1 },
                    { x: new Date("2020- 01- 08"), y: 2 },
					{ x: new Date("2020- 02- 20"), y: 5 },
					{ x: new Date("2020- 03- 11"), y: 8 },
					{ x: new Date("2020- 04- 05"), y: 8 },
					{ x: new Date("2020- 05- 04"), y: 9 }
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