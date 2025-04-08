import PushSubscription from "../model/pushSubscriptionModel.js";

export const createSubscription = async (req, res) => {
  const { subscription } = req.body;

  try {
    // You can upsert (update or insert) the subscription
    await PushSubscription.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      { ...subscription, user: req.user.userId },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, message: "Subscribed" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
