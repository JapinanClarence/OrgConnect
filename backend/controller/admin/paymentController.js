import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";
import Payments from "../../model/paymentModel.js";
import { StudentModel as Student } from "../../model/UserModel.js";

export const createPayment = async (req, res, next) => {
  const { purpose, amount, details, category } = req.body;
  const userId = req.user.userId;

  try {
    //verify if user exist
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const organization = await Organization.findOne({ admin });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }
    if (!organization.active) {
      return res.status(403).json({
        success: false,
        message:
          "Organization is currently not active, limited actions granted.",
      });
    }

    await Payments.create({
      purpose,
      amount,
      details,
      category,
      organization: organization._id,
    });

    res.status(201).json({
      success: true,
      message: "Payment created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getPayment = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    //verify if user exist
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const organization = await Organization.findOne({ admin });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }
    if (!organization.active) {
      return res.status(403).json({
        success: false,
        message:
          "Organization is currently not active, limited actions granted.",
      });
    }

    const payment = await Payments.find({
      organization: organization._id,
    });

    if (payment.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No payments found",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const findPayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;

    const payment = await Payments.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found!",
      });
    }

    const membersPaid = await Promise.all(
      payment.membersPaid.map(async (member) => {
        const memberInfo = await Student.findOne(member.member);
        const fullname = `${memberInfo.firstname} ${
          memberInfo.middlename ? memberInfo.middlename[0] + ". " : ""
        }${memberInfo.lastname}`;
        return {
          fullname,
          profilePicture: memberInfo.profilePicture,
          studentId: memberInfo.studentId,
          year: memberInfo.year,
          course: memberInfo.course,
          amount: member.amount,
          status: member.status,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: membersPaid,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updatePayment = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    //verify if user exist
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const organization = await Organization.findOne({ admin });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    if (!organization.active) {
      return res.status(403).json({
        success: false,
        message:
          "Organization is currently not active, limited actions granted.",
      });
    }

    const paymentId = req.params.id;

    const payment = await Payments.findByIdAndUpdate(paymentId, req.body);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deletePayment = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    //verify if user exist
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const organization = await Organization.findOne({ admin });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    if (!organization.active) {
      return res.status(403).json({
        success: false,
        message:
          "Organization is currently not active, limited actions granted.",
      });
    }

    const paymentId = req.params.id;

    const payment = await Payments.findByIdAndDelete(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
