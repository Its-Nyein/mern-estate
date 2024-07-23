// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4bffe.firebaseapp.com",
  projectId: "mern-estate-4bffe",
  storageBucket: "mern-estate-4bffe.appspot.com",
  messagingSenderId: "896750566050",
  appId: "1:896750566050:web:6b3cd5e263ce182b13b5fb",
  measurementId: "G-LTTFSG4N2D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)