import mongoose from "mongoose";

/**
 * Category:
 * 0 = General info
 * 1 = Meetings
 * 2 = Reminders
 * 3 = News
 * 4 = Alerts
 */

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
    }, 
    category: {
        type: String,
        enum: ["0", "1", "2", "3", "4"],
        default: "0"
    },
    link:{
        type:String,
    },
    organization:{
        type: mongoose.Schema.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"]
    }
}, { timestamps: true });

const Announcements = mongoose.model("Announcements", announcementSchema);

export default Announcements;
