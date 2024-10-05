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
    checkIn: {
        type: String, // Store time as a string in HH:mm format
        required: [true, "Check-in time is required"],
        validate: {
            validator: function(v) {
                return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v); // Regular expression for HH:mm format
            },
            message: props => `${props.value} is not a valid check-in time!`
        }
    },
    checkOut: {
        type: String, // Store time as a string in HH:mm format
        required: [true, "Check-out time is required"],
        validate: {
            validator: function(v) {
                return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v); // Regular expression for HH:mm format
            },
            message: props => `${props.value} is not a valid check-out time!`
        }
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
