// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0CBpRxdEEn98ARHBj1SQwn8YMnneXqY8",
  authDomain: "orgconnectpushnotif.firebaseapp.com",
  projectId: "orgconnectpushnotif",
  storageBucket: "orgconnectpushnotif.firebasestorage.app",
  messagingSenderId: "427135237469",
  appId: "1:427135237469:web:bce91567427d001d6e3cb4",
  measurementId: "G-EN7L0CV41Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);