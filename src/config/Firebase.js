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
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_Auth_Domain}`,
  projectId: `${import.meta.env.VITE_Project_Id}`,
  storageBucket: `${import.meta.env.VITE_Storage_Bucket}`,
  messagingSenderId: `${import.meta.env.VITE_MessagingSender_Id}`,
  appId: `${import.meta.env.VITE_App_Id}`,
  measurementId: `${import.meta.env.VITE_Measurement_Id}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const store = getStorage(app);
export const db = getFirestore(app);
export const Firebase_Auth = getAuth(app)
export default app;