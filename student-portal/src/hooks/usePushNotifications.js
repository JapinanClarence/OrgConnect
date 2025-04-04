import { useEffect } from "react";
import apiClient from "@/api/axios";
// import vapid public key from environment variables
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC;
import { useAuth } from "@/context/AuthContext";
import { s } from "@fullcalendar/core/internal-common";

const usePushNotifications = () => {
  const { token } = useAuth(); // Get the user from the AuthContext
  useEffect(() => {
    const enablePush = async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const swUrl = `${import.meta.env.VITE_PUBLIC_URL}/sw.js`;

        console.log(swUrl);
        const registration = await navigator.serviceWorker.register(swUrl);
        console.log(registration);
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
