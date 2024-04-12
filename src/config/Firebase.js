// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_imtODvT-hwTrZoSAtEumTBnCpLFf5YE",
  authDomain: "book-system-31d99.firebaseapp.com",
  projectId: "book-system-31d99",
  storageBucket: "book-system-31d99.appspot.com",
  messagingSenderId: "758955766377",
  appId: "1:758955766377:web:82997bf57fddcea04e68f8",
  measurementId: "G-F026914DEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const store = getStorage(app);
export const db = getFirestore(app);
export const Firebase_Auth = getAuth(app)
export default app;