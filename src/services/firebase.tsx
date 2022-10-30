// import firebase from 'firebase/app';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/database'

const firebaseConfig = {

  apiKey: "AIzaSyDcXzCBiWZqOOtGvxqphvByzcWVbC3QmT4",

  authDomain: "letmeask-e566b.firebaseapp.com",

  databaseURL: "https://letmeask-e566b-default-rtdb.firebaseio.com",

  projectId: "letmeask-e566b",
  storageBucket: "letmeask-e566b.appspot.com",
  messagingSenderId: "1090742336756",
  appId: "1:1090742336756:web:fc37ec08df38dcf171f2a1"

};

firebase.initializeApp(firebaseConfig);

// console.log(process.env.REACT_APP_API_KAY);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }