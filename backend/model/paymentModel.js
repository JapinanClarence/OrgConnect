import mongoose, { Mongoose } from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    purpose: {
      type: String,
      required: [true, "Purpose is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    details: {
      type: String,
      required: [true, "Details is required"],
    },
    organization: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    membersPaid: [
      {
        member: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        amount: {
            type: Number,
            required:  [true, "Amount is required"],
        },
        /**
         * 0 - not fully paid
         * 1 - full paid
         */
        status:{
            type: String,
            enum: ["0", "1"],
            default: "1"
        }
      },
    ],
  },
  { timestamps: true }
);

const Payments = mongoose.model("Payments", paymentSchema);

export default Payments;
