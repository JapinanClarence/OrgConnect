import AcademicYear from "../../model/academicYearModel.js";
import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";
import Events from "../../model/eventModel.js";
import Announcements from "../../model/announcementModel.js";
import Membership from "../../model/membershipModel.js";
import Payments from "../../model/paymentModel.js";

export const createOrg = async (req, res, next) => {
  const { name, admin, type } = req.body;

  try {
    // console.log(req.body)
    //verify if user exist
    const user = await Admin.findById(admin);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify if the admin is already assigned to an organization
    const existingOrg = await Organization.findOne({ admin });
    if (existingOrg) {
      return res.status(400).json({
        success: false,
        message: "Admin is already assigned to an organization",
      });
    }

    const organization = await Organization.findOne({ name });
    //verify if organization name already exists
    if (organization) {
      return res.status(400).json({
        success: false,
        message: "Organization name already exists",
      });
    }

    const currentAY = await AcademicYear.findOne({ isCurrent: true });
    await Organization.create({
      name,
      type,
      admin,
      academicYear: currentAY,
    });

    res.status(201).json({
      success: true,
      message: "Organization created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const updateOrg = async (req, res, next) => {
  const id = req.params.id;

  try {
    const org = await Organization.findByIdAndUpdate(id, req.body);

    if (!org) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Organization updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getOrg = async (req, res, next) => {
  const email = req.params.user;

  try {
    const org = await Organization.find()
      .populate("admin")
      .sort({ createdAt: -1 });

    if (!org) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const filteredOrgs = org.map((data) => {
      // const fullname = `${data.admin.firstname} ${
      //   data.admin.middlename ? data.admin.middlename[0] + ". " : ""
      // }${data.admin.lastname}`;

      return {
        _id: data.id,
        name: data.name,
        createdAt: data.createdAt,
        admin: data.admin.username,
        active: data.active,
        remarks: data.remarks,
      };
    });

    res.status(200).json({
      success: true,
      data: filteredOrgs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const findOrg = async (req, res, next) => {
  const orgId = req.params.id;
  try {
    const organization = await Organization.findById(orgId);

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    //fetch all events
    const totalEvents = await Events.countDocuments({
      organization: organization._id,
    });

    //event count
    // const totalEvents = events.length();

    const totalAnnouncements = await Announcements.countDocuments({
      organization: organization._id,
    });

    const members = await Membership.find({
      organization: organization._id,
    }).populate("student");

    const { male = 0, female = 0 } = members.reduce(
      (acc, { student: { gender } }) => {
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
      },
      {}
    );

    // Fetch all payments
    const allPayments = await Payments.find({ organization: organization._id });

    // Filter and get feesData (category 0) and calculate total collected payments
    const feesData = allPayments.filter((payment) => payment.category === "0");

    const totalCollectedPayments = feesData.reduce((sum, fees) => {
      const totalPerFee = fees.membersPaid.reduce(
        (acc, member) => acc + (member.amount || 0),
        0
      );
      return sum + totalPerFee;
    }, 0);

    // Fetch all expenses (category 1 and 2) and calculate total expenses
    const expensesData = allPayments.filter(
      (payment) => payment.category === "1" || payment.category === "2"
    );

    const totalExpenses = expensesData.reduce(
      (sum, expense) => sum + (expense.amount || 0),
      0
    );

    res.status(200).json({
      success: true,
      data:organization,
      totalAnnouncements,
      totalEvents,
      totalCollectedPayments,
      totalExpenses,
      totalMaleMembers: male,
      totalFemaleMembers: female,
      transactions: expensesData
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
