import mongoose from "mongoose";

/**
 * 0 - Pending
 * 1 - Approved
 */
const membershipSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to the Student model
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization", // Reference to the Organization model
      required: true,
    },
    status:{
      type: String,
      enum: ["0", "1"],
      default: "0"
    },
    joinedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;