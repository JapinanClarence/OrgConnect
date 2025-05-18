importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA0CBpRxdEEn98ARHBj1SQwn8YMnneXqY8",
  authDomain: "orgconnectpushnotif.firebaseapp.com",
  projectId: "orgconnectpushnotif",
  storageBucket: "orgconnectpushnotif.firebasestorage.app",
  messagingSenderId: "427135237469",
  appId: "1:427135237469:web:bce91567427d001d6e3cb4",
  measurementId: "G-EN7L0CV41Q",
});

const messaging = firebase.messaging();

// Handle background message
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );
  // Customize the notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/OrgConnect-Default.jpeg",
  };
  
  // Show the notification from the service worker
  self.registration.showNotification(notificationTitle, notificationOptions);
});
