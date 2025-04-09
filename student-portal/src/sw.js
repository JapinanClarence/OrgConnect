self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Push event data:", data);
  const options = {
    body: data.message,
    icon: `/OrgConnect-Default.jpeg`,
    data: { url: data.url || "/" },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// self.addEventListener("install", (event) => {
//     self.skipWaiting(); // Forces the waiting Service Worker to become active immediately
//   });

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
