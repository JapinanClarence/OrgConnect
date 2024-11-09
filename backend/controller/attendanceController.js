import Attendance from "../model/attendanceModel.js";
import Organization from "../model/organizationModel.js";
import { StudentModel as Student } from "../model/UserModel.js";
import Events from "../model/eventModel.js";
import Membership from "../model/membershipModel.js";

export const absentCount = async (req, res) => {
  const student = req.user.userId;

  try {
    const membership = await Membership.find({ student, status: "1" });

    if (membership.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No joined organizations found",
      });
    }

    // Get all event IDs for closed events from active organizations
    const events = await Promise.all(
      membership.map(async (data) => {
        const organization = await Organization.findOne({
          _id: data.organization,
          active: true,
        });

        if (organization) {
          // Fetch only closed events (status: "0") for active organizations
          const eventList = await Events.find({
            organization: data.organization,
            status: "0",
          }).select("_id");
          return eventList.map((event) => event._id); // Return event IDs for each active organization
        }
        return []; // Return an empty array if the organization is inactive
      })
    );

    // Flatten the array of arrays to get a single array of event IDs
    const eventIds = events.flat();

    if (eventIds.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No closed events found from active organizations",
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
export const getAttendance = async (req, res, next) => {
  const student = req.user.userId;

  try {
    const membership = await Membership.find({ student, status: "1" });

    if (membership.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No joined organizations found",
      });
    }

    // Get events for each organization (only active organizations), along with organization name
    const events = await Promise.all(
      membership.map(async (data) => {
        const eventList = await Events.find({
          organization: data.organization,
          status: { $in: ["0", "3"] }, // Event status filter
        })
          .populate({
            path: "organization",
            match: { active: true }, // Ensure the organization is active
            select: "name",
          })
          .select("title startDate endDate location organization status");

        return eventList
          .filter((event) => event.organization) // Exclude events without an active organization
          .map((event) => ({
            id: event._id,
            title: event.title,
            location: event.location,
            organizationName: event.organization.name,
            status: event.status,
          }));
      })
    );

    // Flatten the array of arrays to get a single array of event objects
    const flattenedEvents = events.flat();

    if (flattenedEvents.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No events found",
      });
    }

    // Fetch attendance records for each event in active organizations
    const attendanceRecords = await Attendance.find({
      student,
      event: { $in: flattenedEvents.map((event) => event.id) },
    }).select("event checkIn checkOut");

    const attendedEventMap = new Map(
      attendanceRecords.map((record) => [record.event.toString(), record])
    );

    // Map over events to include the attendance status and format final data
    const eventData = flattenedEvents.map((event) => {
      const attendanceRecord = attendedEventMap.get(event.id.toString());
      return {
        ...event,
        checkIn: attendanceRecord ? attendanceRecord.checkIn : null,
        checkOut: attendanceRecord ? attendanceRecord.checkOut : null,
        attendanceStatus: attendanceRecord ? "Present" : "Absent",
      };
    });

    res.status(200).json({
      success: true,
      data: eventData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
