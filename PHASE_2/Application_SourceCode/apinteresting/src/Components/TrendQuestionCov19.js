import ScriptTag from "react-script-tag";
import React, { Component } from "react";

export default class TrendQuestionCov19 extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <h3>Trending Questions</h3>
        <div id="google-trend-container-1">
          <ScriptTag type="text/javascript">
            {`
            const root1 = document.getElementById('google-trend-container-1');
            trends.embed.renderWidgetTo(root1, "US_cu_4Rjdh3ABAABMHM_en_en-AU", "fe_list_6676c6b0-213f-434e-99b2-7079c300945c_en-AU", {"guestPath":"https://trends.google.com:443/trends/embed/"});
          `}
          </ScriptTag>
        </div>
      </div>
    );
  }
}
