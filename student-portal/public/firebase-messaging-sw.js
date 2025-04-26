// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyA0CBpRxdEEn98ARHBj1SQwn8YMnneXqY8",
  authDomain: "orgconnectpushnotif.firebaseapp.com",
  projectId: "orgconnectpushnotif",
  storageBucket: "orgconnectpushnotif.firebasestorage.app",
  messagingSenderId: "427135237469",
  appId: "1:427135237469:web:bce91567427d001d6e3cb4",
  measurementId: "G-EN7L0CV41Q",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/OrgConnect-Default.jpeg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
