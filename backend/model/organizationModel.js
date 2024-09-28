import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description:{
        type: String
    },
    about:{
        type: String
    },
    contact:{
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User is required"]
    }
}, {timestamps : true})

const Organization = mongoose.Model("Organization", organizationSchema);

export default Organization;