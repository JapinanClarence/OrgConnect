import Membership from "../../model/membershipModel.js";
import Attendance from "../../model/attendanceModel.js";
import Announcement from "../../model/announcementModel.js";
import Events from "../../model/eventModel.js";
import Payments from "../../model/paymentModel.js";
import Organization from "../../model/organizationModel.js";
import {
  UserModel as Admin,
  StudentModel,
  UserModel,
} from "../../model/UserModel.js";
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
  const monthString = currentDate.toLocaleDateString("en-US", {
    month: "long",
  });

  try {
    const organization = await Organization.findOne({  $or: [
      { admin: userId },      // Check if the user is an admin
      { subAdmins: userId }    // Check if the user is a sub-admin
    ] });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const totalAnnouncementCount = await Announcement.countDocuments({
      organization: organization._id,
    });

    const announcements = await Announcement.find({
      organization: organization._id,
    });

    const expendedCollections = await Payments.aggregate([
      { $match: { organization: organization._id, category:{$ne: "0"} } }, // Filter documents for the specific organization
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }, // Group and sum the `amount` field
    ]);

    const totalExpendedCollections =
      expendedCollections.length > 0 ? expendedCollections[0].totalAmount : 0;

    //get all fees data
    const feesData = await Payments.find({
      organization: organization._id,
      category: "0",
    });

    //calculate collected payments per record
    const collectedPayments = feesData.map((fees) => {
      const totalPaymentsPerRecord = fees.membersPaid.reduce(
        (sum, member) => sum + (member.amount || 0),
        0
      );
      return totalPaymentsPerRecord;
    });
    //calculate total collected payments
    const totalCollectedPayments = collectedPayments.reduce(
      (sum, payments) => sum + payments || 0,
      0
    );

    const totalEventsCount = await Events.countDocuments({
      organization: organization._id,
    });
    const events = await Events.find({ organization: organization._id })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order (newest first)
      .limit(20)
      .select("title description location"); // Limit the result to the last 20 events

    const totalMembersCount = await Membership.countDocuments({
      organization: organization._id,
      status: "1",
    });
    const members = await Membership.find({
      organization: organization._id,
      status: "1",
    })
      .sort({ createdAt: -1 })
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
        gender: data.student.gender,
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
          event: "$title",
          attendees: { $size: "$attendees" }, // Count attendees
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
          ? event.description.substring(0, 20) + "..."
          : event.description,
      location: event.location,
    }));

    res.status(200).json({
      success: true,
      organization: organization.name,
      eventCount: totalEventsCount,
      announcementCount: totalAnnouncementCount,
      totalCollectedFees: `₱ ${new Intl.NumberFormat("en-US").format(totalCollectedPayments)}`,
      totalExpenses: `₱ ${new Intl.NumberFormat("en-US").format(totalExpendedCollections)}`,
      memberCount: totalMembersCount,
      events: trimmedEvents,
      members: cleanMemberData,
      eventAttendees: eventsAttendees,
      currentMonth: monthString,
      currentYear,
      announcements,
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

export const getReportsData = async (req, res) => {
  const userId = req.user.userId;
  try {
    const organization = await Organization.findOne({ admin: userId });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const events = await Events.find({
      organization: organization._id,
      status: { $in: [3, 0] },
    });

    const attendeesCount = await Promise.all(
      events.map(async (event) => {
        const attendees = await Attendance.find({ event: event._id });

        return {
          _id: event._id,
          title: event.title,
          location: event.location,
          startDate: event.startDate,
          endDate: event.endDate,
          totalAttendees: attendees.length,
        };
      })
    );

    const feesData = await Payments.find({
      organization: organization._id,
      category: "0",
    });

    const membersFees = await Promise.all(
      feesData.map((fees) => {
        const totalCollectedPayments = fees.membersPaid.reduce(
          (sum, member) => sum + (member.amount || 0),
          0
        );

        return {
          _id: fees._id,
          purpose: fees.purpose,
          amount: fees.amount,
          date: fees.createdAt,
          totalCollectedPayments,
        };
      })
    );

    const collectionSpentData = await Payments.find({
      organization: organization._id,
      category: { $ne: "0" },
    });

    const transactions = await Promise.all(
      collectionSpentData.map((data) => {
        return {
          _id: data._id,
          purpose: data.purpose,
          amount: data.amount,
          category: data.category,
          date: data.createdAt,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        attendeesCount,
        membersFees,
        transactions,
        organizationStartYear: organization.createdAt,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
