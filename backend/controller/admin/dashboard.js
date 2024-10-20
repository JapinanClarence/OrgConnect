import Membership from "../../model/membershipModel.js";
import Attendance from "../../model/attendanceModel.js";
import Announcement from "../../model/announcementModel.js";
import Events from "../../model/eventModel.js";
import Payments from "../../model/paymentModel.js";
import Organization from "../../model/organizationModel.js";
import { UserModel as Admin } from "../../model/UserModel.js";
import mongoose from "mongoose";
import { studentOrgs } from "../organizationController.js";

export const getDashboardData = async (req, res) => {
  const userId = req.user.userId;
  // Get the first and last day of the current month
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Get the current month (1-12)
  const currentYear = currentDate.getFullYear();

  try {
    const organization = await Organization.findOne({ user: userId });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const totalAnnouncementCount = await Announcement.countDocuments({
      organization: organization._id,
    });
    const totalPaymentCount = await Payments.countDocuments({
      organization: organization._id,
    });

    const totalEventsCount = await Events.countDocuments({
      organization: organization._id,
    });
    const events = await Events.find({ organization: organization._id })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order (newest first)
      .limit(20)
      .select("title description location"); // Limit the result to the last 20 events

    const totalMembersCount = await Membership.countDocuments({
      organization: organization._id,
    });
    const members = await Membership.find({ organization: organization._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("student");

    const cleanMemberData = members.map((data) => {
      const fullname = `${data.student.firstname} ${
        data.student.middlename ? data.student.middlename[0] + ". " : ""
      }${data.student.lastname}`;
      return {
        studentId: data.student.studentId,
        fullname: fullname,
        email: data.student.email,
        year: data.student.year,
        course: data.student.course,
        profilePicture: data.student.profilePicture,
        joinedDate: dateOnly(data.joinedDate),
      };
    });

    // Fetch events with attendees count for the current month
    const eventsAttendees = await Events.aggregate([
      {
        $match: {
          organization: organization._id,
          $expr: {
            $and: [
              { $eq: [{ $month: "$startDate" }, currentMonth] }, // Filter by month
              { $eq: [{ $year: "$startDate" }, currentYear] }, // Filter by year
            ],
          },
        },
      },
      {
        $lookup: {
          from: "attendances", // Your attendance collection name
          localField: "_id",
          foreignField: "event",
          as: "attendees",
        },
      },
      {
        $project: {
          eventName: "$title",
          attendeesCount: { $size: "$attendees" }, // Count attendees
        },
      },
      {
        $sort: { startDate: -1 }, // Sort by date, latest first
      },
      {
        $limit: 20, // Fetch the last 20 events
      },
    ]);

    // Trim the description to 80 characters
    const trimmedEvents = events.map((event) => ({
      title: event.title,
      description:
        event.description.length > 80
          ? event.description.substring(0, 80) + "..."
          : event.description,
      location: event.location,
    }));

    res.status(200).json({
      success: true,
      eventCount: totalEventsCount,
      announcementCount: totalAnnouncementCount,
      paymentCount: totalPaymentCount,
      memberCount: totalMembersCount,
      events: trimmedEvents,
      members: cleanMemberData,
      eventAttendees: eventsAttendees,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const dateOnly = (dateString) => {
  const date = new Date(dateString); // Parse the date string into a Date object
  return date.toLocaleString("en-US", {
    year: "numeric", // Full year
    month: "2-digit", // 2-digit month (MM)
    day: "2-digit", // Day of the month with leading zero (DD)
  });
};
