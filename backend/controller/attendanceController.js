import Attendance from "../model/attendanceModel.js";
import Organization from "../model/organizationModel.js";
import { StudentModel as Student } from "../model/UserModel.js";
import Events from "../model/eventModel.js";
import Membership from "../model/membershipModel.js";

export const absentCount = async (req, res) => {
  const student = req.user.userId;

  try {
    const membership = await Membership.find({ student, status: "1" });
    console.log(membership)
    if (membership.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No joined organizations found",
      });
    }

    // Get all event IDs for each joined organization
    const events = await Promise.all(
      membership.map(async (data) => {
        const eventList = await Events.find({
          organization: data.organization,
          status: "0"
        }).select("_id");
        return eventList.map((event) => event._id);
      })
    );

    // Flatten the array of arrays to get a single array of event IDs
    const eventIds = events.flat();

    if (eventIds.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No closed events found",
      });
    }

    // Find absences by counting events with no attendance records for the student
    const attendanceRecords = await Attendance.find({
      student,
      event: { $in: eventIds },
    }).select("event");

    const attendedEventIds = new Set(
      attendanceRecords.map((record) => record.event.toString())
    );
    const totalAbsences = eventIds.filter(
      (id) => !attendedEventIds.has(id.toString())
    ).length;

    res.status(200).json({
      success: true,
      data: {
        totalAbsences,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getAttendance = async (req, res, next) => {};
