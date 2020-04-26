import ScriptTag from "react-script-tag";
import React, { Component } from "react";

export default class DiseaseTopicTrend extends Component {
  constructor(props) {
    super();
    this.state = {
      country : "AU",
    };
  }

  render() {
    return (
      <div>
        <h3>Disease Realted Terms</h3>
        <div id="google-trend-container-4">
          <ScriptTag type="text/javascript">
            {`
            const root4 = document.getElementById('google-trend-container-4');
            trends.embed.renderExploreWidgetTo(root4, 
              "RELATED_TOPICS", 
              {"comparisonItem":[{"keyword":"disease","geo":"AU","time":"today 12-m"}],"category":0,"property":""}, 
              {"exploreQuery":"q=disease&geo=AU&date=today 12-m","guestPath":"https://trends.google.com:443/trends/embed/"});
          `}
          </ScriptTag>
        </div>
      </div>

    );
  }
}
