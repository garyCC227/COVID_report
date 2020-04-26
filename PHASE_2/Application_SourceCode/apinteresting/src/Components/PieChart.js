/* App.js */
import React from "react";
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_list: props.data_list,
      country: props.country
    }
    this.same_data_list = this.same_data_list.bind();
  }

  same_data_list(list1, list2) {
    if (list1.length != list2.length) {
      return false;
    }
    var i = 0;
    while (list1[i]) {
      if (list1[i]["Name"] != list2[i]["Name"] || list1[i]["Cases"] != list2[i]["Cases"]) {
        return false;
      }
      i++;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.same_data_list(this.props.data_list, nextProps.data_list) || this.props.country !== nextProps.country) {
      this.setState({
        data_list: nextProps.data_list,
        country: nextProps.country
      });
    }
  }

  render() {
    var data_points = [];
    var sub_title = 0;
    var i = 0;
    var indexLabel = "{name}: {y} outbreaks";
    while (this.state.data_list[i]) {
      const data = { name: this.state.data_list[i]["Name"], y: this.state.data_list[i]["Cases"].length };
      sub_title += this.state.data_list[i]["Cases"].length;
      data_points.push(data);
      i++;
    }
    if (data_points.length == 0) {
      indexLabel = "";
      data_points = [{ name: "Outbreak", y: 1 }];
    }
    const options = {
      animationEnabled: true,
      startAngle: 80,
      animationDuration: 1000,
      title: {
        text: this.state.country + " Overview",
        verticalAlign: "top", // "top", "center", "bottom"
        horizontalAlign: "center", // "left", "right", "center"
        font: "helvetica",
        fontSize: "30"
      },
      subtitles: [{
        text: "Total " + sub_title + " \nOutbreaks",
        verticalAlign: "center",
        fontSize: 18,
        fontFamily: "Arial",
        dockInsidePlotArea: true
      }],
      legend: {
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      data: [{
        type: "doughnut",
        showInLegend: true,
        indexLabel: indexLabel,
        // yValueFormatString: "#,###'%'",
        dataPoints: data_points
      }]
    }
    return (
      <div>
        <CanvasJSChart options={options}
        /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
