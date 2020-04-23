import React from "react";
import Divider from "@material-ui/core/Divider";
import { Alert, AlertTitle } from '@material-ui/lab';
import Card from "./Style/Card.js";
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";

import ArticleSearchToolbar from "./ArticleSearchToolbar";
import ArticleList from "./ArticleList";


class ArticleListPage extends React.Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      valid_search: true
    };

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.initValue = this.initValue.bind(this);
  }

  initValue = async () => {
    const url =
      "https://apinteresting.xyz/v1/news?start_date=2020-03-03T12%3A56%3A00&end_date=2020-03-03T12%3A57%3A00&keyterms=coronavirus%2Cflu&location=China";
    const lists = await fetch(url, {
      method: "GET",
      headers: { identity: "header" }
    })
      .then(res => {
        // console.log(res.json());
        return res.json();
      })
      .then(res => {
        // console.log(Array(res.data));
        return res.data;
      });

    this.setState({ articles: lists, valid_search: true });
  };

  componentDidMount() {
    this.initValue();
  }

  //change to fetch later
  onSearchSubmit = async search_form => {
    var url = `https://apinteresting.xyz/v1/news?start_date=${search_form.start_date}:00&end_date=${search_form.end_date}:00&keyterms=${search_form.keyword}&location=${search_form.location}`;
    const lists = await fetch(url, {
      method: "GET",
      headers: { identity: "header" }
    })
      .then(res => {
        // console.log(res.json());
        return res.json();
      })
      .then(res => {
        // console.log(Array(res.data));
        return res.data;
      });

    //TODO: handle invalid input
    if (Array.isArray(lists) == true && lists.length > 0) {
      // console.log(lists);
      this.setState({ articles: lists, valid_search: true });
    } else {
      this.setState({ valid_search: false });
    }
  };

  render() {
    const validSearch = this.state.valid_search;
    let content;
    if (validSearch) {
      content = <ArticleList articles={this.state.articles} />;
    } else {
      content = (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Invalid Search!! Please try again...
        </Alert>
      );
    }
    return (
      <div>
        <Card>
          <CardHeader color="rose">
            <h2>Article List</h2>
          </CardHeader>
          <CardBody />
        </Card>
        <Card>
          <CardBody>
            <ArticleSearchToolbar onSubmit={this.onSearchSubmit} />
          </CardBody>
        </Card>
        {content}

      </div>
    );
  }
}

export default ArticleListPage;

