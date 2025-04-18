// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA73pXD6crheMQ6gx12zAy8UQAAfuBcXmA",
  authDomain: "whimsical-pirate.firebaseapp.com",
  databaseURL: "https://whimsical-pirate-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "whimsical-pirate",
  storageBucket: "whimsical-pirate.firebasestorage.app",
  messagingSenderId: "10505485436",
  appId: "1:10505485436:web:783ea3d535bb427aa6ddf9",
  measurementId: "G-TSKEKJJJ33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);