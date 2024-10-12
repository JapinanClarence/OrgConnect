import mongoose, { Mongoose } from "mongoose";

const paymentSchema = new mongoose.Schema({
    purpose : {
        type: String,
        required: [true, "Purpose is required"]
    },
    amount:{
        type: Number,
        required:[true, "Amount is required"]
    },
    details:{
        type:String,
        required: [true, "Details is required"]
    },
    organization : {
        type: mongoose.Schema.ObjectId,
        required: true
    }
}, {timestamps});

const Payments = mongoose.model("Payments", paymentSchema);

export default Payments;