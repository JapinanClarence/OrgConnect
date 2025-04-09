import { useEffect } from "react";
import apiClient from "@/api/axios";
// import vapid public key from environment variables
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC;
import { useAuth } from "@/context/AuthContext";

const usePushNotifications = () => {
  const { token, isAuthenticated } = useAuth(); // Get the user from the AuthContext
  useEffect(() => {
    // if (!isAuthenticated) return; // Check if the user is authenticated
    const enablePush = async () => {
      // Check if the browser supports service workers and push notifications
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const swUrl = `/sw.js`;
        console.log("Service Worker URL:", swUrl);
        const registration = await navigator.serviceWorker.register(swUrl);

        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });

        await apiClient.post(
          "/notification/subscribe",
          { subscription },
          {
            headers: {
              Authorization: token, // Use the token from the AuthContext
            },
          }
          // { withCredentials: true }
        );
      }
    };

    enablePush();
  }, []);
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
export default usePushNotifications;
