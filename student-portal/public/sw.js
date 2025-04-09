self.addEventListener("push", (event) => {
  if (!event.data) {
    console.error("Push event has no data!");
    return;
  }

  try {
    const data = event.data.json();
    console.log("Push event data:", data);

    const options = {
      body: data.message || "You have a notification",
      icon: `/OrgConnect-Default.jpeg`,
      data: { url: data.url || "/" },
    };

    event.waitUntil(
      self.registration.showNotification(data.title || "OrgConnect", options)
    );
  } catch (error) {
    console.error("Error parsing push data:", error);
  }
});

// self.addEventListener("install", (event) => {
//     self.skipWaiting(); // Forces the waiting Service Worker to become active immediately
//   });

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
