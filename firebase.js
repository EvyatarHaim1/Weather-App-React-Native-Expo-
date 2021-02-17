import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDlJxD6UmwU9TE7f63I0VIIqx24FxGym28",
  authDomain: "weather-app-evyatar-haim.firebaseapp.com",
  projectId: "weather-app-evyatar-haim",
  storageBucket: "weather-app-evyatar-haim.appspot.com",
  messagingSenderId: "329092855945",
  appId: "1:329092855945:web:5b5b9f973d9595efff6e58",
  measurementId: "G-K2667GVXY4"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);