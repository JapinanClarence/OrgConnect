import { useEffect, useRef } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
// import vapid public key from environment variables
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC;

const usePushNotifications = () => {
  const { token, isAuthenticated } = useAuth();
  const hasSubscribedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || !token || hasSubscribedRef.current) return; // Ensure only authenticated users
    
    hasSubscribedRef.current = true;
    
    const enablePush = async () => {
      try {
        if ("serviceWorker" in navigator && "PushManager" in window) {
          const swUrl = `/sw.js`;

          const registration = await navigator.serviceWorker.register(swUrl);
          console.log("Worker registration successful", registration.scope);

          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            console.warn("Push notifications not granted by user.");
            return;
          }

          const existingSubscription =
            await registration.pushManager.getSubscription();

          if (!existingSubscription) {
            const newSubscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
            });

            await apiClient.post(
              "/notification/subscribe",
              { subscription: newSubscription },
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            console.log("New push subscription successful:", newSubscription);
          } else {
            console.log("Already subscribed:", existingSubscription);
          }
        }
      } catch (error) {
        console.error("Error enabling push notifications:", error);
      }
    };

    enablePush();
  }, [isAuthenticated, token]);
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
