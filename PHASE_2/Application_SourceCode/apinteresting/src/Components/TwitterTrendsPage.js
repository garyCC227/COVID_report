import React, { Component } from 'react';
import firebase from '../fbconfig'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "./Style/CardHeader.js";
import CardBody from "./Style/CardBody.js";
import Typography from '@material-ui/core/Typography';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker'
import Loader from 'react-loader-spinner'
import HashtagGraph from './HashtagGraph'
import Divider from '@material-ui/core/Divider';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// Required for side-effects
require("firebase/functions");
const styles = ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
  },
});


var functions = firebase.functions();

class TwitterTrendsPage extends Component {
  state = {
    twitterPosts: [],
    isLoading: true,
  }

  componentWillMount () {
    const script = document.createElement("script");
 
    script.src = 'https://hashtagify.me/assets/hashtagify/embed.js';
    script.async = true;
 
    document.body.appendChild(script);
  }

  componentDidMount = () => {
    var getTweets = firebase.functions().httpsCallable('getTweets')
    trackPromise(
      getTweets()
        .then(res => {
          console.log(res.data)
          this.setState({ twitterPosts: res.data, isLoading: false })

        })
    )
  }

  LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
      promiseInProgress &&
      <span className="loader">

        <Loader type="ThreeDots" height={100} width={100} />
      </span>
    );
  }



  render() {
    const { classes } = this.props
    return (
      <div>
        <Card>
          <CardHeader color="info">
            <h2>Twitter Trends</h2>
          </CardHeader>
          <CardBody />
        </Card>
      <div>
        {this.state.isLoading ? <div style={{ textAlign: "center" }}><this.LoadingIndicator /></div> 
        : 
        <div>
        {(this.state.twitterPosts).filter((key,i) => i < 5).map((item) => {
          return (
            <div key={item.id}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {item.user['name']}
                  </Typography>

                  <Typography className={classes.pos} color="textSecondary">
                    Retweeted: <b>{item.retweet_count} times</b>
                  </Typography>

                  <Typography variant="body2" component="p">
                    {item.full_text}
                    <br />
                  </Typography>
                </CardContent>

              </Card>
              <br />
            </div>
          )
        })}
        <Divider/>
        <HashtagGraph />
        </div>
        }
        <Divider/>
      </div>
      <br/>
      <div class="hastagify_embed" data-hashtag="Disease" data-width="1600" data-mode="table"><div><a href="http://hashtagify.me/"></a></div></div>
      </div>);
  }
}
export default withStyles(styles)(TwitterTrendsPage);