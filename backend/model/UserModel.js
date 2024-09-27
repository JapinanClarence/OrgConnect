import mongoose from "mongoose";
import bcrypt from "bcrypt";
/**
 * Roles
 * 0 - Superadmin
 * 1 - admin
 * 2 - Student
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      enum: ["0", "1", "2"],
      default: "2",
    },
    password: {
      type: String,
      minLength: 8
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving it to the database
userSchema.pre(
  "save",
  async function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (user.isModified("password")) {
      try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      } catch (err) {
        return next(err);
      }
    }
    next();
  },
  { discriminatorKey: "role", collection: "users" }
);

// Method to compare a given password with the hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Base UserModel
const UserModel = mongoose.model("User", userSchema);

//Student specific schema
const StudentSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  middlename: { type: String },
  studentId: { type: String },
  age: { type: String },
  contactNumber: { type: String },
  course: { type: String },
});

//Discriminator for student
const StudentModel = UserModel.discriminator("2", StudentSchema);

export { UserModel, StudentModel };
