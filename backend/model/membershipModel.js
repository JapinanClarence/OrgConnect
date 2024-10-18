import mongoose from "mongoose";

/**status
 * 0 - Pending
 * 1 - Approved
 * position
 * 0- member
 * rank
 * 0 -member
 */
const membershipSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Student model
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization", // Reference to the Organization model
      required: true,
    },
    status: {
      type: String,
      enum: ["0", "1"],
      default: "0",
    },
    position: {
      type: String,
      default: "member", // Default to member; can be updated to specific officer positions
      enum: [
        "governor",
        "vice-governor",
        "secretary",
        "treasurer",
        "auditor",
        "business manager",
        "pio",
        "president",
        "vice-president",
        "member",
      ],
    },
    joinedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;
