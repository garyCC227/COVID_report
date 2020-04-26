import ScriptTag from "react-script-tag";
import React, { Component } from "react";


export default class GoogleTrendsChart extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <h3>Cov-19 Search Interest For Search Keyword</h3>
        <div id="google-trend-container">
          <ScriptTag type="text/javascript">
            {`
            const root = document.getElementById('google-trend-container');
            trends.embed.renderWidgetTo(
              root,
              "US_cu_4Rjdh3ABAABMHM_en_en-AU",
              "fe_line_chart_c57f6363-decb-4fe9-8f3a-e05ec0b99e0f_en-AU",
              {"guestPath":"https://trends.google.com:443/trends/embed/"});
            `}
          </ScriptTag>
        </div>
      </div>
    );
  }
}
