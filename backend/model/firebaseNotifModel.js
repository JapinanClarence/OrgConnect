import mongoose from "mongoose";

const firebaseNotifSchema = new mongoose.Schema(
  {
    fcmToken: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const FirebaseNotif = mongoose.model("FirebaseNotif", firebaseNotifSchema);

export default FirebaseNotif;
