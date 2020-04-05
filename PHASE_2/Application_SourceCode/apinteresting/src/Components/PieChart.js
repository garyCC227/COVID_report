/* App.js */
import React from "react";
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PieChart extends React.Component {
    constructor(){
        super();
    }

	render() {
		const options = {
            animationEnabled: true,
            startAngle: 80,
            animationDuration: 1000,
			title: {
                verticalAlign: "top", // "top", "center", "bottom"
				horizontalAlign: "left", // "left", "right", "center"
				font: "helvetica",
                fontWeight: "bold",
                fontSize: "35"
			},
            legend:{
                verticalAlign: "bottom",
                horizontalAlign: "center"
            },
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y} cases",
				// yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: "Other", y: 2 },
					{ name: "H1N5", y: 12 },
                    { name: "Coronavirus", y: 235 },
                    { name: "Zika", y: 9 },
					{ name: "Lassa Fever", y: 12 },
                    { name: "Hantavirus", y: 18 },
                    { name: "Hepatitis", y: 35 }
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
