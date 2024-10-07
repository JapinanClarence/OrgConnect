import mongoose from "mongoose";

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
    active:{
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"]
    }
}, { timestamps: true });

const Events = mongoose.model("Events", eventSchema);

export default Events;
