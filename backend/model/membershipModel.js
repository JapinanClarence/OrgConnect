import mongoose from "mongoose";

/**
 * 0 - Banned
 * 1 - Approved
 * 2 - Pending
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
      enum: ["0", "1", "2"],
      default: "2"
    },
    joinDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;