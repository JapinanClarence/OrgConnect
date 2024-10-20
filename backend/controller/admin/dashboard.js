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
      .limit(20).select("title description location"); // Limit the result to the last 20 events

    const totalMembersCount = await Membership.countDocuments({
      organization: organization._id,
    });
    const members = await Membership.find({ organization: organization._id})
      .sort({ createdAt: -1 })
      .limit(20).populate("student");

    const cleanMemberData = members.map((data) => ({
        studentId : data.student.studentId,
        firstname : data.student.firstname,
        lastname : data.student.lastname,
        middlename : data.student.middlename,
        email : data.student.email,
        year : data.student.year,
        course : data.student.course,
        profilePicture : data.student.profilePicture,
        dateJoined: data.joinedDate
    }))

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

    res.status(200).json({
        success:true,
        eventCount : totalEventsCount,
        announcmentcount : totalAnnouncementCount,
        paymenCount : totalPaymentCount,
        memberCount : totalMembersCount,
        events,
        members : cleanMemberData,
        eventAttendees: eventsAttendees
    })
   
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
