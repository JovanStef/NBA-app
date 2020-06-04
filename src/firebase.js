import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAEKwXyaMbBUBg0vq0DtGkZftG_T4JNGM0",
    authDomain: "nba-react-app-47314.firebaseapp.com",
    databaseURL: "https://nba-react-app-47314.firebaseio.com",
    projectId: "nba-react-app-47314",
    storageBucket: "nba-react-app-47314.appspot.com",
    messagingSenderId: "817032236703",
    appId: "1:817032236703:web:9bf0c5b405542fe30e1caa",
    measurementId: "G-567FLLG9T9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

const firebaseDB = firebase.database();

const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseFormater =(snapshot)=>{
    const data = [];

    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    return data;
}

export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseFormater
}


