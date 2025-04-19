// src/firebase.js

import { getFirestore, collection } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const dbRealtime = getDatabase(app); // Realtime Database

// Initialize Firestore (if you need Firestore as well)
const dbFirestore = getFirestore(app); // Firestore

// Initialize Firebase Authentication
const auth = getAuth(app); // Firebase Authentication

// Example of collection reference for Firestore
const materialsRef = collection(dbFirestore, "materials"); 

// Export initialized instances
export { dbRealtime as db, dbFirestore, auth, materialsRef }; 
