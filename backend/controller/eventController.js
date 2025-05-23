import Membership from "../model/membershipModel.js";
import Organization from "../model/organizationModel.js";
import { StudentModel as Student } from "../model/UserModel.js";
import Events from "../model/eventModel.js";
import Attendance from "../model/attendanceModel.js";

export const getAllEvents = async (req, res) => {
  const student = req.user.userId;

  try {
    const membership = await Membership.find({ student, status: "1" });

    if (membership.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No joined organizations found",
      });
    }

    // Find events from active organizations only
    const events = await Promise.all(
      membership.map(async (data) => {
        const organization = await Organization.findOne({
          _id: data.organization,
        });

        if (organization) {
          // Fetch events only if the organization is active
          const eventList = await Events.find({
            organization: data.organization,
          })
            .populate("organization", "name")
            .sort({ createdAt: -1 });

          return eventList; // Return the list of events for each active organization
        }

        return []; // Return an empty array if the organization is inactive
      })
    );

    // Flatten the array and filter out empty arrays (inactive organizations)
    const flattenedEvents = events.flat();

    if (flattenedEvents.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No events found",
      });
    }
    const sortedEvents = flattenedEvents.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    res.status(200).json({
      success: true,
      data: sortedEvents,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getEvents = async (req, res) => {
  const student = req.user.userId;
  const organization = req.params.id;
  try {
    const membership = await Membership.findOne({ student, organization });

    if (!membership) {
      return res.status(200).json({
        success: false,
        message: "Organization not found",
      });
    }

    const events = await Events.find({ organization })
      .populate("organization", "name")
      .sort({ createdAt: -1 });

    if (events.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No events found",
      });
    }

    const attendanceStatus = await Promise.all(
      events.map(async (event) => {
        const isAttendanace = ["0"];
        const attendance = await Attendance.find({ event: event._id });

        const hasAttended = attendance.some(
          (att) => att.student.toString() === student.toString()
        );

        const baseEventData = {
          _id: event._id,
          title: event.title,
          description: event.description,
          startDate: event.startDate,
          endDate: event.endDate,
          location: event.location,
          organization: event.organization,
          createdAt: event.createdAt,
          updatedAt: event.updatedAt,
          status: event.status,
          postedBy: event.postedBy,
        };

        if (isAttendanace.includes(event.status)) {
          return {
            ...baseEventData,
            attendance: hasAttended ? "1" : "0", // 1 = attended, 0 = not attended
          };
        } else {
          return {
            ...baseEventData,
            attendance: hasAttended ? "1" : "2", // 1 = attended, 2 = not allowed
          };
        }
      })
    );

    // console.log(attendanceStatus)

    res.status(200).json({
      success: true,
      data: attendanceStatus,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
