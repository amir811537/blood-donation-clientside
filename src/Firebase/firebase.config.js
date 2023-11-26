// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl9dUgMElycuA88y1gKGur57HDpMhh05Y",
  authDomain: "blood-donation-auth-adf7b.firebaseapp.com",
  projectId: "blood-donation-auth-adf7b",
  storageBucket: "blood-donation-auth-adf7b.appspot.com",
  messagingSenderId: "988698963610",
  appId: "1:988698963610:web:94f19b0686238124fef923"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;