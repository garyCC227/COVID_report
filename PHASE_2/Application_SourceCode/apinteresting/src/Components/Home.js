import React, { Component } from 'react';
import GoogleTrendChart from './GoogleTrendChart.js'
import TrendQuestionCov19 from './TrendQuestionCov19.js'
import CovSearchTrend from './CovSearchTrend.js'
import DiseaseTopicTrend from './DiseaseTopicTrend.js'
import PieChart from './Piechart1.js'
import Cov19Table from './Cov19Table.js'

export default class Home extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }

  render() {
    return (
      <div class="w3-display-container">

        {/* float top: functional button */}
        <div id="functional-button" class="w3-container w3-left" style={{'padding':'10px'}}>
          <div class="w3-container" class="w3-card w3-border w3-round" style={{'padding':'10px'}}>
            <header>
              <h3>
                Redirect To
              </h3>
            </header>
            <div class="ui red four item menu" style={{'width':'900px'}}>
              <a href="/" class="active item">
                  Home
                </a>
                <a href="/article-list" class="item">
                  Search Articles List
                </a>
                <a class="item" href="/alerts">
                  Outbreak Info
                </a>
                <a class="item" href="/health-care">
                  Health Care Method
                </a>
            </div>
          </div>

          <br/>
          <div id='disease-social-impact' class="w3-card w3-boarder w3-round" style={{'width':'950px', 'padding':'10px'}}>
            <header>
              <h3>
                Disease Social Impact
              </h3>
            </header>
            <hr/>

            <div class="w3-container">
              <h5> Disease Realted Topics Trend</h5>
              <DiseaseTopicTrend/>
            </div>

            <hr/>
            <div class="w3-container">
              <h2 class="w3-center" style={{'fontFamily':'serif'}}> <b>Disease Articles in Database</b></h2>
              <PieChart/>
            </div>

            <hr/>
            <div class="w3-container">
            <h2 class="w3-center" style={{'fontFamily':'serif'}}> <b>Cov-19 Situation</b></h2>
              <Cov19Table/>
              <div class="extra content w3-text-grey">
                <i class="time icon"></i>
                Just Now
              </div>
            </div>

          </div>
        </div>



        {/* float-right: cov-19 information */}
        <div id="cov-19" class="w3-right ui card" style={{'width':'600px'}}>
          <div class="content">
              <div class="header"> <h2 class="w3-text-cyan">Cov-19 Info</h2></div>
          </div>


          <div class="content">
            <div class="header"> <h5 class="w3-text-pink">Search interest</h5></div>
            <div class="description"> 
              <GoogleTrendChart/>
            </div>
            <div class="extra content w3-text-grey">
                <i class="time icon"></i>
                Past week
            </div>
          </div>

          <br/>
          
          <div class="content">
            <div class="header"> <h5 class="w3-text-pink">Trending search quries on Cov-19</h5></div>
            <div class="description"> 
              <TrendQuestionCov19/>
            </div>
            <div class="extra content w3-text-grey">
                <i class="time icon"></i>
                Past week
            </div>
          </div>

          <br/>
          
          <div class="content">
          <div class="header"> <h5 class="w3-text-pink">Search interest for coronavirus by state</h5></div>

            <div class="description"> 
              <CovSearchTrend/>
            </div>
            <div class="extra content w3-text-grey">
                <i class="time icon"></i>
                Past week
            </div>
          </div>
        </div>

      </div>
    );
  }
}

