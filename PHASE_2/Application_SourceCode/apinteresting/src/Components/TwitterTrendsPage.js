import React, { Component } from 'react';
import firebase from '../fbconfig'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
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

    componentDidMount = () => {
        var getTweets = firebase.functions().httpsCallable('getTweets')
        getTweets()
            .then(res => {
                console.log(res.data)
                this.setState({ twitterPosts: res.data, isLoading: false })

            })
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                {(this.state.twitterPosts).map((item) => {
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
            </div>);
    }
}
export default withStyles(styles)(TwitterTrendsPage);