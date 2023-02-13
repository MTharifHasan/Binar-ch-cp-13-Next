import { useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyBliHkS7AuYMOPpQBUUC-IxqTo1PShYy4E",
  authDomain: "challenge-chapter-10-d60f7.firebaseapp.com",
  databaseURL: "https://challenge-chapter-10-d60f7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "challenge-chapter-10-d60f7",
  storageBucket: "challenge-chapter-10-d60f7.appspot.com",
  messagingSenderId: "955894794649",
  appId: "1:955894794649:web:00f3ca9e9a8508652a2b08",
  measurementId: "G-SVBXX0L49L"
};

// const config = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// let firebaseApp;

// if (!getApps().length) {    
const   firebaseApp = initializeApp(config);
  // } else {    
  //    firebaseApp = getApp();
  // }

  console.log(firebaseApp);

const authFirebase = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
console.log(database);

const storage = getStorage(firebaseApp);

// const auth = getAuth();
export default {
  authFirebase, database, storage
}


