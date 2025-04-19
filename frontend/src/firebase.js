// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA73pXD6crheMQ6gx12zAy8UQAAfuBcXmA",
  authDomain: "whimsical-pirate.firebaseapp.com",
  databaseURL: "https://whimsical-pirate-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "whimsical-pirate",
  storageBucket: "whimsical-pirate.appspot.com",
  messagingSenderId: "10505485436",
  appId: "1:10505485436:web:783ea3d535bb427aa6ddf9",
  measurementId: "G-TSKEKJJJ33"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
