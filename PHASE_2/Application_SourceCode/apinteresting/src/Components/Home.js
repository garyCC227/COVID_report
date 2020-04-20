import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';


export default class home extends React.Component{
  constructor(){
    super();
    this.ref = React.createRef();
  }

  componentDidMount(){

  }

  render(){
    // var temp = React.createClass({
    //   render:function(){ 
    //     trends.embed.renderWidget("US_cu_4Rjdh3ABAABMHM_en_en-AU",
    //     "fe_related_queries_c42508a0-7f03-4f36-a097-3d644d5ea101", 
    //     {"guestPath":"https://trends.google.com:443/trends/embed/"}); 

    //     return (
    //       <div> 
    //         hello
    //       </div>
    //     )
    //   }
    // });
    return(
      <div>
        hello world
      </div>
    );
  }
}

