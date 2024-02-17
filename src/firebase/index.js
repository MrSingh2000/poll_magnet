import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlQJwRfoFI63rfNPZUsH7fabxmvi8H-w8",
  authDomain: "poll-magnet.firebaseapp.com",
  projectId: "poll-magnet",
  storageBucket: "poll-magnet.appspot.com",
  messagingSenderId: "1020294529905",
  appId: "1:1020294529905:web:1cc505feb4f9bf0c676cd0",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// firestore
export const fireStoredb = getFirestore(firebaseApp);

// Initialize Firebase Authentication and get a reference to the service
export const firebaseAuth = getAuth(firebaseApp);
