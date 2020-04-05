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
			subtitles: [{
				text: "Total 148 Cases",
				verticalAlign: "center",
				fontSize: 22,
				dockInsidePlotArea: true
			}],
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
					{ name: "Swine Fever", y: 2 },
					{ name: "Dengue", y: 7 },
                    { name: "Coronavirus", y: 122 },
                    { name: "Zika", y: 9 },
					{ name: "Lassa Fever", y: 3 },
                    { name: "Hantavirus", y: 5 },
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
