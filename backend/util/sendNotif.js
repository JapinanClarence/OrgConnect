// import PushSubscription from "../model/pushSubscriptionModel.js";
// import webpush from "web-push";

// export const sendNotificationToAll = async (title, message, url = "/") => {
//   const subscriptions = await PushSubscription.find();

//   const payload = JSON.stringify({
//     title,
//     message,
//     url,
//   });

//   subscriptions.forEach((sub) => {
//     webpush.sendNotification(sub, payload).catch((error) => {
//       console.log(error);
//       console.error("Push error:", error.message);
//     });
//   });
// };

// export const sendNotificationToUser = async (userId, title, message, url) => {
//   const subscription = await PushSubscription.findOne({ user: userId });

//   if (!subscription) {
//     console.log("No subscription found for user");
//     return;
//   }

//   const payload = JSON.stringify({
//     title,
//     message,
//     url,
//   });

//   try {
//     await webpush.sendNotification(subscription, payload);
//     console.log("Notification sent to user", userId);
//   } catch (error) {
//     console.error("Error sending notification to user:", error);

//     // If the subscription is no longer valid, delete it
//     if (error.statusCode === 410 || error.statusCode === 404) {
//       try {
//         await PushSubscription.findByIdAndDelete(subscription._id);
//         console.warn("Deleted invalid subscription:", subscription._id);
//       } catch (deleteError) {
//         console.error("Failed to delete invalid subscription:", deleteError);
//       }
//     }
//   }
// };

import FirebaseNotif from "../model/firebaseNotifModel.js";
import { getMessaging } from "firebase-admin/messaging";

export const sendFirebaseNotif = async (title, body, users) => {
  try {
    // 1. Find all fcmTokens for the given users
    const fcmTokenRecords = await FirebaseNotif.find({
      user: { $in: users }, // users is an array of user IDs
    }).select("fcmToken -_id");
    
    // 2. Extract token strings
    const fcmTokens = fcmTokenRecords
      .map(record => record.fcmToken)
      .filter(token => !!token); // filter out null/undefined

    if (fcmTokens.length === 0) {
      console.log("No FCM tokens found for users.");
      return { success: false, message: "No tokens found" };
    }

    console.log(fcmTokens)
    // 3. Prepare the message
    const message = {
      notification: {
        title,
        body,
      },
      tokens: fcmTokens,
    };

    // 4. Send the multicast message
    const response = await getMessaging().sendEachForMulticast(message);

    console.log("Successfully sent multicast message:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error sending multicast message:", error);
    return { success: false, error };
  }
};
