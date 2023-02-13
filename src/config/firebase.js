import { useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// const config = {
//   apiKey: "AIzaSyBliHkS7AuYMOPpQBUUC-IxqTo1PShYy4E",
//   authDomain: "challenge-chapter-10-d60f7.firebaseapp.com",
//   databaseURL: "https://challenge-chapter-10-d60f7-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "challenge-chapter-10-d60f7",
//   storageBucket: "challenge-chapter-10-d60f7.appspot.com",
//   messagingSenderId: "955894794649",
//   appId: "1:955894794649:web:00f3ca9e9a8508652a2b08",
//   measurementId: "G-SVBXX0L49L"
// };

const config = {
  apiKey: "AIzaSyAsxrRFa7VzHOuqyPd9dzy9tQOlrexUJ80",
  authDomain: "binar-platinum-fsw26.firebaseapp.com",
  databaseURL: "https://binar-platinum-fsw26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "binar-platinum-fsw26",
  storageBucket: "binar-platinum-fsw26.appspot.com",
  messagingSenderId: "425031383335",
  appId: "1:425031383335:web:6936f2fdac7d77dc3dd102"
};

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


