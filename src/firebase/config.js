// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyADWvwUY8XwQo7igVLbu5p-CECSdzqWX_Y",
  authDomain: "hng-stagethree.firebaseapp.com",
  projectId: "hng-stagethree",
  storageBucket: "hng-stagethree.appspot.com",
  messagingSenderId: "78239176312",
  appId: "1:78239176312:web:315c88239be71d7eb6ff8d",
  measurementId: "G-RR9S17JEPF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

