// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

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
  measurementId: "G-EN7L0CV41Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const VAPID_KEY = import.meta.env.VITE_VAPID_KEY;

export const generateToken = async () => {
  const permission = await Notification.requestPermission();

  console.log(permission);

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });
    console.log(token)
  }
};
