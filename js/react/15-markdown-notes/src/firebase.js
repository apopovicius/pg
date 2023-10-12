import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUTSokyG5aZP7996PpgilfDjJtmLjXmk8",
  authDomain: "react-notes-b7e03.firebaseapp.com",
  projectId: "react-notes-b7e03",
  storageBucket: "react-notes-b7e03.appspot.com",
  messagingSenderId: "1092804997717",
  appId: "1:1092804997717:web:a329078f70f1deb51e5adc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
