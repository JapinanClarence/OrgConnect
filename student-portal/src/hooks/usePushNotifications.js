import { useEffect } from "react";
import apiClient from "@/api/axios";
// import vapid public key from environment variables
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;
import { useAuth } from "@/context/AuthContext";

const usePushNotifications = () => {
  const { token } = useAuth(); // Get the user from the AuthContext
  useEffect(() => {
    const enablePush = async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const registration = await navigator.serviceWorker.register("/sw.js");

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
            // credentials: 'include' // Uncomment if you need to send cookies with the request
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
