import mongoose, { Mongoose } from "mongoose";

/**
 * org type
 * 0 - Institute Based Organization 
 * 1  - Non-institute Based Organization
 * 2 - Religious Based Organization
 * 3- Fraternities
 */
const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    about: {
      type: String,
    },
    contact: {
      type: String,
    },
    banner: {
      type: String,
    },
    type: {
      type: String,
      enum: ["0", "1", "2", "3"],
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    subAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    active: {
      type: Boolean,
      default: true,
    },
    adviser:{
      type: String,
    },
    officerPositions: {
      type: [{ position: String, rank: Number }],
      default: [], // Set default to empty array initially
    },
    academicYear: {type: mongoose.Schema.Types.ObjectId, ref: "AcademicYear", required: true},
    remarks:{
      type: String,
    }
  },
  { timestamps: true }
);

// Pre-save hook to set officer positions based on type
organizationSchema.pre("save", function (next) {
  if (!this.officerPositions.length) {
    // Only set positions if they haven't been set yet
    const instituteBased = [
      { position: "governor", rank: 1 },
      { position: "vice-governor", rank: 2 },
      { position: "secretary", rank: 3 },
      { position: "treasurer", rank: 4 },
      { position: "auditor", rank: 5 },
      { position: "business manager", rank: 6 },
      { position: "pio", rank: 7 },
    ];

    const others = [
      { position: "president", rank: 1 },
      { position: "vice-president", rank: 2 },
      { position: "secretary", rank: 3 },
      { position: "treasurer", rank: 4 },
      { position: "auditor", rank: 5 },
      { position: "business manager", rank: 6 },
      { position: "pio", rank: 7 },
    ];

    // Set officerPositions based on the type of organization
    this.officerPositions =
      this.type === "0" ? instituteBased : others;
  }
  next();
});

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
