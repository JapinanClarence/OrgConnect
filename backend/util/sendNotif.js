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
    webpush.sendNotification(sub, payload).catch((error) => {
      console.log(error);
      console.error("Push error:", error.message);
    });
  });
};

export const sendNotificationToUser = async (userId, title, message, url) => {
  const subscription = await PushSubscription.findOne({ user: userId });

  if (!subscription) {
    console.log("No subscription found for user");
    return;
  }

  const payload = JSON.stringify({
    title,
    message,
    url,
  });

  try {
    await webpush.sendNotification(subscription, payload);
    console.log("Notification sent to user", userId);
  } catch (error) {
    console.error("Error sending notification to user:", error);

    // If the subscription is no longer valid, delete it
    if (error.statusCode === 410 || error.statusCode === 404) {
      try {
        await PushSubscription.findByIdAndDelete(subscription._id);
        console.warn("Deleted invalid subscription:", subscription._id);
      } catch (deleteError) {
        console.error("Failed to delete invalid subscription:", deleteError);
      }
    }
  }
};

