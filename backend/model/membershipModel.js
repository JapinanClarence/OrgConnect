import mongoose from "mongoose";

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
    joinDate: {
      type: Date,
      default: Date.now, 
    },
  },
  { timestamps: true }
);

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;