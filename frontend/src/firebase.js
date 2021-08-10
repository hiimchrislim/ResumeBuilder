/**
 * src/firebase.js
 */
 import firebase from "firebase/app";
 import "firebase/auth";
 
 const firebaseConfig = {
  apiKey: "AIzaSyCxqOMgfEntJZQMt3TFG1vO_6ljxTwvZaM",
  authDomain: "cheddar-dev-cfcbf.firebaseapp.com",
  projectId: "cheddar-dev-cfcbf",
  storageBucket: "cheddar-dev-cfcbf.appspot.com",
  messagingSenderId: "977144514707",
  appId: "1:977144514707:web:4cfb35590b8c8ddd8e2566"
};
 
 firebase.initializeApp(firebaseConfig);
 
 const auth = firebase.auth();
 
 export { auth, firebase };