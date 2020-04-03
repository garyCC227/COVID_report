import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ArticleSearchToolbar from "./ArticleSearchToolbar";
import ArticleList from "./ArticleList";

const data = {
  id: "046fu6uh96V9zlcVlUTK",
  url:
    "http://www.cidrap.umn.edu/news-perspective/2020/02/canada-lebanon-report-iran-linked-covid-19-cases-concerns-rise",
  date_of_publication: "2020-02-21 23:05:21",
  headline:
    "Canada, Lebanon report Iran-linked COVID-19 cases as concerns rise",
  main_text:
    "University of Minnesota. Driven to Discover.Following recent reports of COV..."
};

class ArticleListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: this.initValue()
    };

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  //TODO:
  initValue() {
    const url =
      "https://apinteresting.xyz/v1/news?start_date=2020-02-15T00%3A00%3A00&end_date=2020-03-01T00%3A00%3A00&keyterms=coronavirus%2Cflu&location=China";
    const lists = fetch(url, {
      method: "GET",
      headers: { identity: "header" }
    })
      .then(res => {
        console.log(res);
        return res.json;
      })
      .then(res => {
        return res.data;
      });

    console.log(lists);
    return [data];
  }

  //change to fetch later
  onSearchSubmit(search_form) {
    //TODO: change to fetch later
    console.log(
      search_form.start_date,
      search_form.end_date,
      search_form.location,
      search_form.keyword
    );
    this.setState({ articles: [data, data, data] });
  }

  render() {
    return (
      <div>
        <ArticleSearchToolbar onSubmit={this.onSearchSubmit} />
        <Divider />
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }
}

export default ArticleListPage;
