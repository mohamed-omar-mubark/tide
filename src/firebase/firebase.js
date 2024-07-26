// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx9wu0atV7twp9504YzDCMZn6WmrKx14Q",
  authDomain: "tide-4e12c.firebaseapp.com",
  projectId: "tide-4e12c",
  storageBucket: "tide-4e12c.appspot.com",
  messagingSenderId: "450807326955",
  appId: "1:450807326955:web:e38c8aecfc53f58ab836ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
