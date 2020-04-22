/* App.js */
import React from "react";
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class LineChart extends React.Component {

    constructor(props){
		super(props);
		this.state = {
            data_list : props.data_list,
            display_total : props.display_total
		}
    }

	render() {
        var data = this.state.data_list.filter((key) => key["is_checked"]).map((key) => {
            var i = 0;
            var dic = {};
            while (key["Cases"][i]) {
                const date = key["Cases"][i]["DateTime"].substring(0,10);
                if (!dic[date]) {
                    dic[date] = 1;
                } else {
                    dic[date] += 1;
                }
                i++;
            }
            var data_points = [];

            var prev = 0;

            for (var k in dic) {
                if (dic.hasOwnProperty(k)) {
                    data_points.push({"x" : new Date(k), "y" : dic[k]});
                }
              }
            data_points = data_points.sort((a,b) => a["x"] - b["x"]).map((key) => {
                prev += key["y"];
                return {"x" : key["x"], "y" : prev} 
            })
            return {
                type: "line",
                axisYType: "secondary",
                name: key["Name"],
                showInLegend: true,
                markerSize: 12,
                dataPoints: data_points}
        });
        if (this.state.display_total) {
            var total_dic = {};
            var total_list = [];
            this.state.data_list.map((key) => {
                var i = 0;
                while (key["Cases"][i]) {
                    const date = key["Cases"][i]["DateTime"].substring(0,10);
                    if (!total_dic[date]) {
                        total_dic[date] = 1;
                    } else {
                        total_dic[date] += 1;
                    }
                    i++;
                }
            });
            for (var o in total_dic) {
                if (total_dic.hasOwnProperty(o)) {
                    total_list.push({"x" : new Date(o), "y" : total_dic[o]});
                }
            }
            var counter = 0;
            total_list = total_list.sort((a,b) => a["x"] - b["x"]).map((key) => {
                counter += key["y"];
                return {"x" : key["x"], "y" : counter} 
            })
            data.push({
                type: "line",
                axisYType: "secondary",
                name: "Total",
                showInLegend: true,
                markerSize: 13,
                dataPoints: total_list.sort((a,b) => (a["x"] - b["x"]))}
        )};
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
            data: data
		}
		return (
		<div>
			<CanvasJSChart options = {options}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
