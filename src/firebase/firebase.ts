// Import the functions you need from the SDKs you need

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLRd1yC_pYzEXOVJEuL7l0kaVFxBdhWTc",
  authDomain: "markify-digital-app.firebaseapp.com",
  projectId: "markify-digital-app",
  storageBucket: "markify-digital-app.firebasestorage.app",
  messagingSenderId: "52344047650",
  appId: "1:52344047650:web:5773bcb9fefcbb0b84a27b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);