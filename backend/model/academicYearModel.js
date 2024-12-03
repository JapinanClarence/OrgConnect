import mongoose from "mongoose";

/**
 * 0 - 1st sem
 * 1 - 2nd sem
 */
const academicYearSchema = new mongoose.Schema({
    academicYear:{
        type: String,
        required: [true, "Academic year is required"]
    },
    semester :{
        type: String,
        enum:['0','1'],
        required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isCurrent: { type: Boolean, default: false },
},
{ timestamps: true })

const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);

export default AcademicYear;