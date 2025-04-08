import mongoose from "mongoose";

const PushSubscriptionSchema = new mongoose.Schema(
  {
    endpoint: String,
    keys: {
      auth: String,
      p256dh: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const PushSubscription = mongoose.model(
  "PushSubscription",
  PushSubscriptionSchema
);

export default PushSubscription;
