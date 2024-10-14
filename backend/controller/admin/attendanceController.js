import Attendance from "../../model/attendanceModel.js";
import Events from "../../model/eventModel.js";
import Membership from "../../model/membershipModel.js";
import { StudentModel as Student } from "../../model/UserModel.js";

export const createAttendance = async (req, res, next) => {
  const { eventId, studentId } = req.body;
  try {
    const isMember = await Membership.findOne({student: studentId});
  
    if(isMember.status == "0"){
      return res.status(403).json({
        success: false,
        message: "Student unauthorized",
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
      student: studentId,
    });
    res.status(201).json({
      success: true,
      message: "Attendance recorded",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateAttendance = async (req, res, next) => {
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

    const attendance = await Attendance.findByIdAndUpdate(req.params.id, {
      checkOut: Date.now(),
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Attendance recorded",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAttendance = async (req, res, next) => {
  try {
    //fetch attendees base on its event id
    const attendance = await Attendance.find({ event: req.params.id });

    if (attendance.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No attendees found",
      });
    }

    const student = await Promise.all(
      attendance.map(async (attendance) => {
        const data = await Student.findById(attendance.student).select(
          "studentId firstname lastname middlename email course profilePicture"
        );
        const fullname = `${data.firstname} ${data.middlename ? data.middlename[0] + '. ' : ''}${data.lastname}`;
        return {
          _id: attendance._id,
          studentId: data.studentId,
          fullname,
          email: data.email,
          course: data.course,
          profilePicture : data.profilePicture,
          checkIn: attendance.checkIn,
          checkOut: attendance.checkOut
        }
      })
    );

    // console.log(req.params.id);
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
