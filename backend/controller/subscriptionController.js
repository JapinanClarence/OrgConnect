import FirebaseNotif from "../model/firebaseNotifModel.js";

export const createSubscription = async (req, res) => {
  const user = req.user.userId;
  const { fcmToken } = req.body;

  try {
    const existingToken = await FirebaseNotif.findOne({ fcmToken });

    if (!existingToken) {
      await FirebaseNotif.create({ fcmToken, user });
      console.log("FCM token saved");
    }
    res.status(201).json({ success: true, message: "FCM token saved" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
