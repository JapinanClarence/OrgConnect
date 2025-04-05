self.addEventListener("push", async function (event) {
  const data = event.data.json();
    console.log("Push event data:", data);
  const options = {
    body: data.message,
    // icon: "pwa-512x512.png",
    data: { url: data.url || "/" },
  };
  console.log("Push event options:", options);
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("install", (event) => {
    self.skipWaiting(); // Forces the waiting Service Worker to become active immediately
  });

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
