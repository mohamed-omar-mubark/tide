import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
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

// init storage
export const storage = getStorage();

// init services
const db = getFirestore(app);

export { app, auth, db };
