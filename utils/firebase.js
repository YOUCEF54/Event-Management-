// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYK8Mdf9I5caXKrFAH3wC5qDBL9_vjJ8w",
  authDomain: "next-auth-fda07.firebaseapp.com",
  projectId: "next-auth-fda07",
  storageBucket: "next-auth-fda07.appspot.com",
  messagingSenderId: "297402408596",
  appId: "1:297402408596:web:e72e3efa2490fa0f069e81",
  measurementId: "G-50RSX237YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();