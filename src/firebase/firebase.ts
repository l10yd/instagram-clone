// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1YUvDIAH4PS7DY9ydaaAfwJTMvinm7eU",
  authDomain: "instagram-clone-e92ce.firebaseapp.com",
  projectId: "instagram-clone-e92ce",
  storageBucket: "instagram-clone-e92ce.appspot.com",
  messagingSenderId: "733835444596",
  appId: "1:733835444596:web:32c9f1ebb6b9e8440cec21",
  measurementId: "G-RK3M6DYVMP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
