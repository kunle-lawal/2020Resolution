import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  apiKey: "AIzaSyD5g6A1de8yECQFUQ01hJu5y8HbvXaryB8",
  authDomain: "resolutionapp-be990.firebaseapp.com",
  databaseURL: "https://resolutionapp-be990.firebaseio.com",
  projectId: "resolutionapp-be990",
  storageBucket: "resolutionapp-be990.appspot.com",
  messagingSenderId: "604404432375",
  appId: "1:604404432375:web:e4522d5358bae258bc82f2",
  measurementId: "G-1W4K2TT8N6"
};

firebase.initializeApp(config);
// firebase.firestore().settings({timestampsInSnapshots: true});
// const firestore = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true };
// firestore.settings(settings);

export default firebase;