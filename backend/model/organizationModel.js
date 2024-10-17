import mongoose from "mongoose";

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
        type:String,
    },
    officers : [
      {
        firstname: {
          type: String
        },
        lastname: {
          type: String
        },
        middlename: {
          type: String
        },
        position: {
          type: String
        },
        rank:{
          type: Number
        },
        profilePicture:{
          type:String
        }
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
