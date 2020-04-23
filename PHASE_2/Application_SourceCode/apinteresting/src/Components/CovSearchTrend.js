import ScriptTag from "react-script-tag";
import React, { Component } from "react";

export default class CovSearchTrend extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (


      <div>
        <h3>Search Interest</h3>
        <div id="google-trend-container-2">
          <ScriptTag type="text/javascript">
            {`
            const root2 = document.getElementById('google-trend-container-2');
            trends.embed.renderWidgetTo(root2,
            "US_cu_4Rjdh3ABAABMHM_en_en-AU", 
            "fe_geo_chart_49d3fb26-cf91-460b-8eab-d4a423b784d0", 
            {"guestPath":"https://trends.google.com:443/trends/embed/"});
          `}
          </ScriptTag>
        </div>
      </div>
    );
  }
}
