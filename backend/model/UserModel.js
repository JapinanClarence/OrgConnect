import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
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
    required: [true, "Password is required"],
  },
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
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
},{ discriminatorKey: "role", collection: "users" });

// Method to compare a given password with the hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Base UserModel
const UserModel = mongoose.model("User", userSchema);


const StudentSchema = new mongoose.Schema({

})

const StudentModel = mongoose.model("2", StudentSchema);

export {UserModel, StudentModel};