// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjCIZpt5rCwQx5L6uBqM-Y0d2tsD9GWr8",
  authDomain: "adiwiyata-adventure.firebaseapp.com",
  projectId: "adiwiyata-adventure",
  storageBucket: "adiwiyata-adventure.firebasestorage.app",
  messagingSenderId: "978062184018",
  appId: "1:978062184018:web:b21bf906ba7a1a8b45d98b",
  measurementId: "G-WXVNRN2RQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);