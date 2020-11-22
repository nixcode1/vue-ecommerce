import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA1GY7vcCXbaJ0CdsV6AYQgD5asioMDsQM",
      authDomain: "stundent-shop.firebaseapp.com",
      databaseURL: "https://stundent-shop.firebaseio.com",
      projectId: "stundent-shop",
      storageBucket: "stundent-shop.appspot.com",
      messagingSenderId: "623055229467",
      appId: "1:623055229467:web:70101e52bdf71224039ebe",
      measurementId: "G-NYJFDC4WSQ"
  };

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();