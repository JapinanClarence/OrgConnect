import Attendance from "../../model/attendanceModel.js";
import Events from "../../model/eventModel.js";
import Membership from "../../model/membershipModel.js";
import { StudentModel as Student } from "../../model/UserModel.js";

export const createAttendance = async (req, res, next) => {
  const { eventId, studentId } = req.body;
  try {
    const event = await Events.findById(eventId).select(["status"]);

    if (event.status !== "3") {
      return res.status(403).json({
        success: false,
        message: "Event does not accept attendance at the moment",
      });
    }

    const student = await Student.findOne({ studentId: studentId });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const isMember = await Membership.findOne({ student: student.id });

    if (isMember.status == "0") {
      return res.status(403).json({
        success: false,
        message: "Student unauthorized, must be a member.",
      });
    }

    const isCheckOut = await Attendance.findOne({
      student: student.id,
      event: eventId,
    });
    // console.log({
    //   currentData: {eventId, student: student.id},
    //   ifExists: isCheckOut
    // })

    if (isCheckOut) {
      checkOut(student.id, eventId);
    } else {
      await Attendance.create({
        event: eventId,
        student: student.id,
      });
    }
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

const checkOut = async (student, event) => {
  try {
    const attendance = await Attendance.findOneAndUpdate(
      { student, event },
      {
        checkOut: Date.now(),
      }
    );

    if (attendance) {
      return true;
    }
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
    // Fetch attendees based on event ID and sort by latest check-in time
    const attendance = await Attendance.find({ event: req.params.id }).sort({
      checkIn: -1,
    }); // Sort by check-in time in descending order

    if (attendance.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No attendees found",
      });
    }

    const student = await Promise.all(
      attendance.map(async (attendance) => {
        const data = await Student.findById(attendance.student).select(
          "studentId firstname lastname middlename email year course profilePicture"
        );
        const fullname = `${data.firstname} ${
          data.middlename ? data.middlename[0] + ". " : ""
        }${data.lastname}`;
        return {
          _id: data._id,
          studentId: data.studentId,
          fullname,
          email: data.email,
          course: data.course,
          year: data.year,
          profilePicture: data.profilePicture,
          checkIn: attendance.checkIn,
          checkOut: attendance.checkOut,
        };
      })
    );

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
