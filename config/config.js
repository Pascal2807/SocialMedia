import firebase, { remoteConfig } from 'firebase';

//Api details

const firebaseConfig = {
    apiKey: "AIzaSyD2rk9EarmpIhCJ6DOQ4ncjVSTzlV1a4Ho",
    authDomain: "mysocialmedia-6eede.firebaseapp.com",
    databaseURL: "https://mysocialmedia-6eede.firebaseio.com",
    projectId: "mysocialmedia-6eede",
    storageBucket: "mysocialmedia-6eede.appspot.com",
    messagingSenderId: "205622826522",
    appId: "1:205622826522:web:6cdaab552c7a67ce3063a3",
    measurementId: "G-80CW2ZJ2ZW"
};

firebase.initializeApp(firebaseConfig)

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
