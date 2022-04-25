import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAirkfEe9zeSxcieAaOoe0Z91gagcCvouU",
  authDomain: "uscalliber.firebaseapp.com",
  projectId: "uscalliber",
  storageBucket: "uscalliber.appspot.com",
  messagingSenderId: "866680248156",
  appId: "1:866680248156:web:9ea6691ef0d8269f7bd399"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();