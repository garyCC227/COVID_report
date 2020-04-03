import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ArticleSearchToolbar from "./ArticleSearchToolbar";
import ArticleList from "./ArticleList";

const invalid = {
  id: "00000",
  url:
    "",
  date_of_publication: "",
  headline:
    "Invalid Search..",
  main_text:
    "Please try again..."
};

class ArticleListPage extends React.Component {
  constructor() {
    super();

    this.state = {
      articles: []
    };

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.initValue = this.initValue.bind(this);
  }

  //TODO:
  initValue = async ()=> {
    const url ="https://apinteresting.xyz/v1/news?start_date=2020-03-01T00%3A00%3A00&end_date=2020-03-15T00%3A00%3A00&keyterms=coronavirus%2Cflu&location=China";
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
    
    this.setState({articles:lists})
  }

  componentDidMount(){
    this.initValue();
  }


  //change to fetch later
  onSearchSubmit = async (search_form) => {
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
    if (Array.isArray(lists) == true && lists.length > 0){
      // console.log(lists);
      this.setState({articles:lists});
    }else{
      this.setState({articles:[invalid]});
    }
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
