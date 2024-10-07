import Attendance from "../../model/attendanceModel.js";
import Events from "../../model/eventModel.js";
import { StudentModel as Student } from "../../model/UserModel.js";

export const createAttendance = async (req, res, next) => {
  const { eventId, studentId } = req.body;
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const event = await Events.findById(eventId).select(["active"]);

    if (!event.active) {
      return res.status(403).json({
        success: false,
        message: "Event does not accept attendance at the moment",
      });
    }

    await Attendance.create({
        event: eventId,
        student: studentId
    })
    res.status(201).json({
        success: true,
        message:"Attendance recorded"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateAttendance = async (req, res, next) =>{
  const { eventId, studentId } = req.body;
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const event = await Events.findById(eventId).select(["active"]);

    if (!event.active) {
      return res.status(403).json({
        success: false,
        message: "Event does not accept attendance at the moment",
      });
    }

    const attendance = await Attendance.findByIdAndUpdate(req.params.id,{
        checkOut: Date.now()
    })

    if(!attendance){
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }
    res.status(200).json({
        success: true,
        message:"Attendance recorded"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
