import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDDi_8BiyRIN_V5XUHSC4vrDRfgBnSbVBw",
    authDomain: "apinteresting.firebaseapp.com",
    databaseURL: "https://apinteresting.firebaseio.com",
    projectId: "apinteresting",
    storageBucket: "apinteresting.appspot.com",
    messagingSenderId: "295206659250",
    appId: "1:295206659250:web:bbadb3f2768054db9f55ab",
    measurementId: "G-7WSJYV4W9E"
};

firebase.initializeApp(firebaseConfig);

export default firebase;