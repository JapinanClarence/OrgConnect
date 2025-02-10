import mongoose from "mongoose";

/**
 * 0 - Close
 * 1 - Pending
 * 2 - Ongoing
 * 3 - Open
 */
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
    }, 
    startDate: {
        type: Date,
        required: [true, "Start date is required"]
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"]
    },
    status:{
        type: String,
        enum: ["0", "1", "2", "3"],
        default: "1"
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"]
    },
    fee: {
        type: Number,
    }
}, { timestamps: true });

const Events = mongoose.model("Events", eventSchema);

export default Events;
