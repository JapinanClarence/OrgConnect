import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description:{
        type: String
    },
    aboutUs:{
        type: String
    },
    contact:{
        type:String
    }
}, {timestamps : true})

const Organization = mongoose.Model("Organization", organizationSchema);

export default Organization;