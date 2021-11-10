
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };


// For Firebase JS SDK v7.20.0 and later, measurementId is optional

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}else {
  firebase.app()
}

// firebase.initializeApp(firebaseConfig);

export { firebase };