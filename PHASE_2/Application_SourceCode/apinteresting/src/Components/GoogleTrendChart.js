import ScriptTag from 'react-script-tag';
import React, { Component } from "react"

export default class GoogleTrendChart extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div id="google-trend-container">
        <ScriptTag type="text/javascript">
          {
            `
            const root = document.getElementById('google-trend-container');
            trends.embed.renderExploreWidgetTo(
              root,
              "TIMESERIES",
              {
                "comparisonItem": [
                    {
                        "keyword": "Corona",
                        "geo": "",
                        "time": "today 3-m"
                    }
                ],
                "category": 0,
                "property": ""
            },
            {
                "guestPath": "https://trends.google.com:443/trends/embed/"
            })`
          }
        </ScriptTag>
      </div>
    );
  }
}