// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARXdo2gGMqCKhw63nSLq4BJzsRpVNtpRM",
  authDomain: "reactfirebasetodo-ea5b0.firebaseapp.com",
  projectId: "reactfirebasetodo-ea5b0",
  storageBucket: "reactfirebasetodo-ea5b0.appspot.com",
  messagingSenderId: "159445230709",
  appId: "1:159445230709:web:cc0f3e80eb3ea5ec3a843c",
  measurementId: "G-9DL4X08W1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);