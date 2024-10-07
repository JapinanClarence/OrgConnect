import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
    }, 
    organization:{
        type: mongoose.Schema.ObjectId,
        required: [true, "Organization is required"]
    }
}, { timestamps: true });

const Announcements = mongoose.model("Announcements", announcementSchema);

export default Announcements;
