const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


var Twit = require('twit')
var T = new Twit({
    consumer_key: 'TgdqFpQgrXAIVigqZJxHnXTgF',
    consumer_secret: 'ZQTlKg8EfGooEay5ncu99KMNJ7yEAKXKGsBbKVDD7ZOYoB01iF',
    access_token: '784659830615085060-iEOfhsMjneyMlVWOVCKFoVeRe7XeEmW',
    access_token_secret: 'Y9fCIJwVe38cyK41ftYjSVtit0DERZIxScsS6KOjqdrrp',
    timeout_ms: 10 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
})


// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.getTweets = functions.https.onCall((data, context) => {
    var ret = ''
    console.log("Request Made")
    return T.get('search/tweets', { q: 'coronavirus since:2011-07-11', count: 100, tweet_mode: 'extended' })
        .then((res) => {
            console.log(res.data.statuses)
            return res.data.statuses
        })
    // , (err, res, response) => {
    //     console.log("Error ", err)
    //     console.log("Data", res)
    //     ret = res
    //     return { test: "text" }
    // }).then(res => {
    //     return (res)
    // })

});
