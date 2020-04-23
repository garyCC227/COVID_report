import React, { Component } from 'react';
const firebase = require("firebase");
require("firebase/functions");

class TwitterTrendsPage extends Component {
    state = {}

    callFirebaseFunction = event => {
        const callableReturnMessage = firebase.functions().httpsCallable('returnMessage');

        callableReturnMessage().then((result) => {
            console.log(result.data.output);
        }).catch((error) => {
            console.log(`error: ${JSON.stringify(error)}`);
        });
    }

    render() {
        return (<div>

        </div>);
    }
}
export default TwitterTrendsPage;