// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrVabaEtH-A0aJdBRC1GE0jxJDbRhSpBs",
  authDomain: "habit-tracer-90e24.firebaseapp.com",
  projectId: "habit-tracer-90e24",
  storageBucket: "habit-tracer-90e24.firebasestorage.app",
  messagingSenderId: "51642152395",
  appId: "1:51642152395:web:1d47869d972a808135f24e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
