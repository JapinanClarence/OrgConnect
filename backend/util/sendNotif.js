import PushSubscription from "../model/pushSubscriptionModel.js";
import webpush from "web-push";

export const sendNotificationToAll = async (title, message, url = "/") => {
  const subscriptions = await PushSubscription.find();

  const payload = JSON.stringify({
    title,
    message,
    url,
  });

  subscriptions.forEach((sub) => {
    console.log(sub)
    webpush.sendNotification(sub, payload).catch((error) => {
      console.error("Push error:", error.message);
    });
  });
};
