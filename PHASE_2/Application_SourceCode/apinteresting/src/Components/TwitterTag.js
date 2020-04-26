import React, { Component } from 'react';
import ReactLoading from 'react-loading';


const Hardcodedata = [
  {
    "name": "#Coronavirusinpakistan(Cov-19)",
    "url": "https://twitter.com/search?q=%23coronavirusinpakistan&src=typeahead_click",
    "promoted_content": null,
    "query": "%23ChainedToTheRhythm",
    "tweet_volume": 48857
  },
  {
    "name": "#Cov-19",
    "url":"https://twitter.com/search?q=%23cov-19&src=typed_query",
    "promoted_content": null,
    "query": "%23%D8%A7%D9%84%D9%8A%D9%88%D9%85_%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%85%D9%8A_%D9%84%D9%84%D8%B9%D8%AA%D8%A8%D8%A7%D9%86",
    "tweet_volume": null
  },
  {
    "name": "George Lopez",
    "url": "http://twitter.com/search?q=%22George+Lopez%22",
    "promoted_content": null,
    "query": "%22George+Lopez%22",
    "tweet_volume": 90590
  },
  {
    "name": "#H3N2",
    "url": "https://twitter.com/search?q=%23H3N2&src=typed_query",
    "promoted_content": null,
    "query": "%23%D9%82%D9%84_%D9%83%D9%84%D9%85%D9%87_%D9%84%D9%84%D9%8A_%D9%8A%D8%AA%D8%A7%D8%A8%D8%B9%D9%83",
    "tweet_volume": 600
  },
  {
    "name": "#H1N1",
    "url": "https://twitter.com/search?q=%23H1N1&src=typed_query",
    "promoted_content": null,
    "query": "%23FelizMiercoles",
    "tweet_volume": 36103
  },
  {
    "name": "#wednesdaywisdom",
    "url": "http://twitter.com/search?q=%23wednesdaywisdom",
    "promoted_content": null,
    "query": "%23wednesdaywisdom",
    "tweet_volume": 42916
  },
  {
    "name": "Tara Palmer-Tomkinson",
    "url": "http://twitter.com/search?q=%22Tara+Palmer-Tomkinson%22",
    "promoted_content": null,
    "query": "%22Tara+Palmer-Tomkinson%22",
    "tweet_volume": null
  },
  {
    "name": "#CoronaApp(Cov-19)",
    "url": "https://twitter.com/search?q=%23CoronaApp&src=typeahead_click",
    "promoted_content": null,
    "query": "%E5%91%AA%E3%81%84%E3%83%81%E3%83%A7%E3%82%B3",
    "tweet_volume": 15704
  },
  {
    "name": "#CoronavirusInSA",
    "url": "https://twitter.com/search?q=%23CoronavirusInSA&src=typeahead_click",
    "promoted_content": null,
    "query": "%E3%83%A1%E3%83%B3%E3%83%86",
    "tweet_volume": 344416
  },
  {
    "name": "SLAY CAMILIZERS",
    "url": "http://twitter.com/search?q=%22SLAY+CAMILIZERS%22",
    "promoted_content": null,
    "query": "%22SLAY+CAMILIZERS%22",
    "tweet_volume": 707166
  },
  {
    "name": "あなたの精神年齢",
    "url": "http://twitter.com/search?q=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E7%B2%BE%E7%A5%9E%E5%B9%B4%E9%BD%A2",
    "promoted_content": null,
    "query": "%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E7%B2%BE%E7%A5%9E%E5%B9%B4%E9%BD%A2",
    "tweet_volume": null
  },
  {
    "name": "WORK FROM 5H",
    "url": "http://twitter.com/search?q=%22WORK+FROM+5H%22",
    "promoted_content": null,
    "query": "%22WORK+FROM+5H%22",
    "tweet_volume": 54061
  },
  {
    "name": "Leyla Zana",
    "url": "http://twitter.com/search?q=%22Leyla+Zana%22",
    "promoted_content": null,
    "query": "%22Leyla+Zana%22",
    "tweet_volume": null
  },
  {
    "name": "#TwoJustin",
    "url": "http://twitter.com/search?q=%23TwoJustin",
    "promoted_content": null,
    "query": "%23TwoJustin",
    "tweet_volume": null
  },
  {
    "name": "#MyFirstAndLast",
    "url": "http://twitter.com/search?q=%23MyFirstAndLast",
    "promoted_content": null,
    "query": "%23MyFirstAndLast",
    "tweet_volume": 63844
  },
  {
    "name": "#ValentinesDayIn3Words",
    "url": "http://twitter.com/search?q=%23ValentinesDayIn3Words",
    "promoted_content": null,
    "query": "%23ValentinesDayIn3Words",
    "tweet_volume": null
  },
  {
    "name": "#ShePersisted",
    "url": "http://twitter.com/search?q=%23ShePersisted",
    "promoted_content": null,
    "query": "%23ShePersisted",
    "tweet_volume": 45624
  },
  {
    "name": "#HappyJohnnyDay",
    "url": "http://twitter.com/search?q=%23HappyJohnnyDay",
    "promoted_content": null,
    "query": "%23HappyJohnnyDay",
    "tweet_volume": 28560
  },
  {
    "name": "#QuartaDetremuraSDV",
    "url": "http://twitter.com/search?q=%23QuartaDetremuraSDV",
    "promoted_content": null,
    "query": "%23QuartaDetremuraSDV",
    "tweet_volume": 10481
  },
  {
    "name": "#ترحيل_الاجانب_مطلب_وطني",
    "url": "http://twitter.com/search?q=%23%D8%AA%D8%B1%D8%AD%D9%8A%D9%84_%D8%A7%D9%84%D8%A7%D8%AC%D8%A7%D9%86%D8%A8_%D9%85%D8%B7%D9%84%D8%A8_%D9%88%D8%B7%D9%86%D9%8A",
    "promoted_content": null,
    "query": "%23%D8%AA%D8%B1%D8%AD%D9%8A%D9%84_%D8%A7%D9%84%D8%A7%D8%AC%D8%A7%D9%86%D8%A8_%D9%85%D8%B7%D9%84%D8%A8_%D9%88%D8%B7%D9%86%D9%8A",
    "tweet_volume": null
  },
  {
    "name": "#TapperDirtFile",
    "url": "http://twitter.com/search?q=%23TapperDirtFile",
    "promoted_content": null,
    "query": "%23TapperDirtFile",
    "tweet_volume": null
  },
  {
    "name": "#FelizCumplePresidente",
    "url": "http://twitter.com/search?q=%23FelizCumplePresidente",
    "promoted_content": null,
    "query": "%23FelizCumplePresidente",
    "tweet_volume": 15276
  },
  {
    "name": "#MeCasoSiMeDices",
    "url": "http://twitter.com/search?q=%23MeCasoSiMeDices",
    "promoted_content": null,
    "query": "%23MeCasoSiMeDices",
    "tweet_volume": null
  },
  {
    "name": "#FebreroZamorista",
    "url": "http://twitter.com/search?q=%23FebreroZamorista",
    "promoted_content": null,
    "query": "%23FebreroZamorista",
    "tweet_volume": null
  },
  {
    "name": "#NãoSuportoQuando",
    "url": "http://twitter.com/search?q=%23N%C3%A3oSuportoQuando",
    "promoted_content": null,
    "query": "%23N%C3%A3oSuportoQuando",
    "tweet_volume": 14327
  },
  {
    "name": "#NinguemSabeMasEuJa",
    "url": "http://twitter.com/search?q=%23NinguemSabeMasEuJa",
    "promoted_content": null,
    "query": "%23NinguemSabeMasEuJa",
    "tweet_volume": 12856
  },
  {
    "name": "#وش_شعورك_اول_يوم_دوام",
    "url": "http://twitter.com/search?q=%23%D9%88%D8%B4_%D8%B4%D8%B9%D9%88%D8%B1%D9%83_%D8%A7%D9%88%D9%84_%D9%8A%D9%88%D9%85_%D8%AF%D9%88%D8%A7%D9%85",
    "promoted_content": null,
    "query": "%23%D9%88%D8%B4_%D8%B4%D8%B9%D9%88%D8%B1%D9%83_%D8%A7%D9%88%D9%84_%D9%8A%D9%88%D9%85_%D8%AF%D9%88%D8%A7%D9%85",
    "tweet_volume": null
  },
  {
    "name": "#HappyChunghaDay",
    "url": "http://twitter.com/search?q=%23HappyChunghaDay",
    "promoted_content": null,
    "query": "%23HappyChunghaDay",
    "tweet_volume": 16480
  },
  {
    "name": "#DiaDeLaPiscola",
    "url": "http://twitter.com/search?q=%23DiaDeLaPiscola",
    "promoted_content": null,
    "query": "%23DiaDeLaPiscola",
    "tweet_volume": null
  },
  {
    "name": "#زواج_الامير_بدر_بن_عبدالله",
    "url": "http://twitter.com/search?q=%23%D8%B2%D9%88%D8%A7%D8%AC_%D8%A7%D9%84%D8%A7%D9%85%D9%8A%D8%B1_%D8%A8%D8%AF%D8%B1_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%D9%87",
    "promoted_content": null,
    "query": "%23%D8%B2%D9%88%D8%A7%D8%AC_%D8%A7%D9%84%D8%A7%D9%85%D9%8A%D8%B1_%D8%A8%D8%AF%D8%B1_%D8%A8%D9%86_%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%D9%87",
    "tweet_volume": null
  },
  {
    "name": "#UnBuenTaco",
    "url": "http://twitter.com/search?q=%23UnBuenTaco",
    "promoted_content": null,
    "query": "%23UnBuenTaco",
    "tweet_volume": null
  },
  {
    "name": "#PMQs",
    "url": "http://twitter.com/search?q=%23PMQs",
    "promoted_content": null,
    "query": "%23PMQs",
    "tweet_volume": 20406
  },
  {
    "name": "#InteractFalando",
    "url": "http://twitter.com/search?q=%23InteractFalando",
    "promoted_content": null,
    "query": "%23InteractFalando",
    "tweet_volume": null
  },
  {
    "name": "#ナカイの窓",
    "url": "http://twitter.com/search?q=%23%E3%83%8A%E3%82%AB%E3%82%A4%E3%81%AE%E7%AA%93",
    "promoted_content": null,
    "query": "%23%E3%83%8A%E3%82%AB%E3%82%A4%E3%81%AE%E7%AA%93",
    "tweet_volume": 14835
  },
  {
    "name": "#حزب_اللي_ما_يحبون_دانكن",
    "url": "http://twitter.com/search?q=%23%D8%AD%D8%B2%D8%A8_%D8%A7%D9%84%D9%84%D9%8A_%D9%85%D8%A7_%D9%8A%D8%AD%D8%A8%D9%88%D9%86_%D8%AF%D8%A7%D9%86%D9%83%D9%86",
    "promoted_content": null,
    "query": "%23%D8%AD%D8%B2%D8%A8_%D8%A7%D9%84%D9%84%D9%8A_%D9%85%D8%A7_%D9%8A%D8%AD%D8%A8%D9%88%D9%86_%D8%AF%D8%A7%D9%86%D9%83%D9%86",
    "tweet_volume": 18170
  },
  {
    "name": "#LIZAonTWBA",
    "url": "http://twitter.com/search?q=%23LIZAonTWBA",
    "promoted_content": null,
    "query": "%23LIZAonTWBA",
    "tweet_volume": 68066
  },
  {
    "name": "#nldebat",
    "url": "http://twitter.com/search?q=%23nldebat",
    "promoted_content": null,
    "query": "%23nldebat",
    "tweet_volume": null
  },
  {
    "name": "#ConselhosDeUmTrouxa",
    "url": "http://twitter.com/search?q=%23ConselhosDeUmTrouxa",
    "promoted_content": null,
    "query": "%23ConselhosDeUmTrouxa",
    "tweet_volume": 11419
  },
  {
    "name": "#PBBKiligOverload",
    "url": "http://twitter.com/search?q=%23PBBKiligOverload",
    "promoted_content": null,
    "query": "%23PBBKiligOverload",
    "tweet_volume": 70766
  },
  {
    "name": "#MiMejorPiropoParaTi",
    "url": "http://twitter.com/search?q=%23MiMejorPiropoParaTi",
    "promoted_content": null,
    "query": "%23MiMejorPiropoParaTi",
    "tweet_volume": null
  },
  {
    "name": "#8Feb",
    "url": "http://twitter.com/search?q=%238Feb",
    "promoted_content": null,
    "query": "%238Feb",
    "tweet_volume": null
  },
  {
    "name": "#عوده_منصور_البلوي",
    "url": "http://twitter.com/search?q=%23%D8%B9%D9%88%D8%AF%D9%87_%D9%85%D9%86%D8%B5%D9%88%D8%B1_%D8%A7%D9%84%D8%A8%D9%84%D9%88%D9%8A",
    "promoted_content": null,
    "query": "%23%D8%B9%D9%88%D8%AF%D9%87_%D9%85%D9%86%D8%B5%D9%88%D8%B1_%D8%A7%D9%84%D8%A8%D9%84%D9%88%D9%8A",
    "tweet_volume": null
  },
  {
    "name": "#LoveBeyondFlags",
    "url": "http://twitter.com/search?q=%23LoveBeyondFlags",
    "promoted_content": null,
    "query": "%23LoveBeyondFlags",
    "tweet_volume": null
  },
  {
    "name": "#EscándaloOdebrecht",
    "url": "http://twitter.com/search?q=%23Esc%C3%A1ndaloOdebrecht",
    "promoted_content": null,
    "query": "%23Esc%C3%A1ndaloOdebrecht",
    "tweet_volume": null
  },
  {
    "name": "#PregúntaleAPedro",
    "url": "http://twitter.com/search?q=%23Preg%C3%BAntaleAPedro",
    "promoted_content": null,
    "query": "%23Preg%C3%BAntaleAPedro",
    "tweet_volume": null
  },
  {
    "name": "#بذاءه_مصري_في_كريم",
    "url": "http://twitter.com/search?q=%23%D8%A8%D8%B0%D8%A7%D8%A1%D9%87_%D9%85%D8%B5%D8%B1%D9%8A_%D9%81%D9%8A_%D9%83%D8%B1%D9%8A%D9%85",
    "promoted_content": null,
    "query": "%23%D8%A8%D8%B0%D8%A7%D8%A1%D9%87_%D9%85%D8%B5%D8%B1%D9%8A_%D9%81%D9%8A_%D9%83%D8%B1%D9%8A%D9%85",
    "tweet_volume": 38019
  },
  {
    "name": "#MSWL",
    "url": "http://twitter.com/search?q=%23MSWL",
    "promoted_content": null,
    "query": "%23MSWL",
    "tweet_volume": null
  },
  {
    "name": "#WhatsappÇöktü",
    "url": "http://twitter.com/search?q=%23Whatsapp%C3%87%C3%B6kt%C3%BC",
    "promoted_content": null,
    "query": "%23Whatsapp%C3%87%C3%B6kt%C3%BC",
    "tweet_volume": null
  },
  {
    "name": "#SoMeArrependoDe",
    "url": "http://twitter.com/search?q=%23SoMeArrependoDe",
    "promoted_content": null,
    "query": "%23SoMeArrependoDe",
    "tweet_volume": null
  },
  {
    "name": "#حزب_العاطلين_بتويتر",
    "url": "http://twitter.com/search?q=%23%D8%AD%D8%B2%D8%A8_%D8%A7%D9%84%D8%B9%D8%A7%D8%B7%D9%84%D9%8A%D9%86_%D8%A8%D8%AA%D9%88%D9%8A%D8%AA%D8%B1",
    "promoted_content": null,
    "query": "%23%D8%AD%D8%B2%D8%A8_%D8%A7%D9%84%D8%B9%D8%A7%D8%B7%D9%84%D9%8A%D9%86_%D8%A8%D8%AA%D9%88%D9%8A%D8%AA%D8%B1",
    "tweet_volume": null
  }
]

export default class TwitterTag extends React.Component{
  constructor(){
    super()
    this.state = {
      loading:false,
      data:[],//this is the tags we shown on front-end
      globaldata:[], // thsi is the all the tags data related to the search country
      inputval:'Australia'
    }
    this.onMouseClick = this.onMouseClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onTagFilter = this.onTagFilter.bind(this)
  }

  componentDidMount(){
    //TODO: default get austrlia tags

    this.setState(
      {
        loading:true,
        data:[{
          "name": "Tags Are Clickable",
          "url": "http://twitter.com/search?q=Austrlia",
          "promoted_content": null,
          "query": "%23SoMeArrependoDe",
          "tweet_volume": null
        },]
      }
    )
  }

  onMouseClick(evt){
    // TODO: do country search here

    //default filter response by cov-19
    var tag_keyword = "Cov-19";
    var result = []
    for(var tag of Hardcodedata){ //TODO: change this to loop through response data
      if(tag.name.includes(tag_keyword)){
        result.push(tag)
      }
    }

    this.setState(
      {inputval:evt.target.name,
        data:Hardcodedata.slice(0,5).concat(result), // TODO: change this to response data && default shown: 1 Cov-19 tags + 5 other tags
        globaldata:Hardcodedata // TODO:update response tags data here
      }
    )
  }


  onTagFilter(evt){
    var tag_keyword = evt.target.name;
    var result = []
    for(var tag of this.state.globaldata){
      if(tag.name.includes(tag_keyword)){
        result.push(tag)
      }
    }

    this.setState({data:result})
  }

  onInputChange(evt){
    this.setState({inputval:evt.target.value})
  }

  render(){
    let Component;
    if(!this.state.loading){
      Component = (
        <div className="w3-display-container">
          <ReactLoading class="w3-display-middle" type="spin" color="#34c0eb" height={100} width={100} />
        </div>
      );
    }else{
        const tags = this.state.data.map(function(tag){
        var color = ['blue','red','green','teal', 'orange', 'black','pink']
        var i = Math.floor(Math.random() * 7);
        var classname = "ui ".concat(color[i], " tag label w3-small w3-margin-left w3-margin-top w3-opacity");
        return (
          <a class={classname} href={tag.url} style={{'textDecoration':'underline'}}><b>{tag.name}: {tag.tweet_volume}</b>  <i class="hotjar icon"></i></a>
        );
      });
      Component = (
        <div class="ui cards" >
          <div class="card" style={{'width':'100%'}}>
            <div class="content">
              <div class="header">
                {/* input tag */}
                <h5>Search Tags By Country:</h5>
                <div class="ui right labeled left icon input">
                    <i class="map marker alternate icon"></i>
                    <input type="text" placeholder="Australia" id="input" onChange={this.onInputChange} name={this.state.inputval} value={this.state.inputval}/>
                    <a class="ui blue tag label" onClick={this.onMouseClick} name={this.state.inputval}>
                      Search
                    </a>
                    {/* TODO: change tag filter here if you want */}
                    <h7 class="w3-margin-left w3-margin-right">Tag Filter:</h7>
                    <a class="ui tag label" onClick={this.onTagFilter} name="Cov-19">
                      Cov-19
                    </a>
                    <a class="ui tag label" onClick={this.onTagFilter} name="H1N1">
                      H1N1
                    </a>
                    <a class="ui tag label" onClick={this.onTagFilter} name="H3N2">
                      H3N2
                    </a>
                </div>
                {/* end of input tag */}
              </div>
            </div>


            {/* tag shown here */}
            <div class="extra content">
              <div class="w3-container" style={{'width':'100%'}}>
                <h5>Click Tag To See Tweets! </h5>

                {tags}
              </div>
            </div>
            {/* tags shown end */}
          </div>
        </div>
      );
    }

    return (
      <div>
        {Component}
      </div>
    );
  }
}