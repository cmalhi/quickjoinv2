import firebase from 'firebase';

//firebase credentials
var config = {
  apiKey: "AIzaSyDsZYc8qOBcqsZLM6Tt0ZlMvwW5eLfjqX4",
  authDomain: "quickjoin-fb5fc.firebaseapp.com",
  databaseURL: "https://quickjoin-fb5fc.firebaseio.com",
  projectId: "quickjoin-fb5fc",
  storageBucket: "quickjoin-fb5fc.appspot.com",
  messagingSenderId: "384944885467"
};

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth