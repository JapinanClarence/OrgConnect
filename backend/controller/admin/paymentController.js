import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin, UserModel } from "../../model/UserModel.js";
import Payments from "../../model/paymentModel.js";
import { StudentModel as Student } from "../../model/UserModel.js";
import Membership from "../../model/membershipModel.js";
import { sendFirebaseNotif } from "../../util/sendNotif.js";

export const createPayment = async (req, res, next) => {
  const { purpose, amount, details, category, paidBy, dueDate } = req.body;
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

    const organization = await Organization.findOne({
      $or: [
        { admin: userId }, // Check if the user is an admin
        { subAdmins: userId }, // Check if the user is a sub-admin
      ],
    });

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
    const allowedPaymentRoles = ["4", "1"]; // Define allowed roles for payment creation
    const allowedTransactionRoles = ["5", "1"]; // Define allowed roles for transaction creation

    // Check if the user is allowed to create payments based on their role and category
    if (
      (category === "0" && !allowedPaymentRoles.includes(admin.role)) ||
      (category !== "0" && !allowedTransactionRoles.includes(admin.role))
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions",
      });
    }
    await Payments.create({
      purpose,
      amount,
      details,
      category,
      organization: organization._id,
      dueDate,
      paidBy,
    });

    if (category === "0") {
      //get all organization members
      const membership = await Membership.find({
        organization: organization._id,
      });
      // Extract all student IDs from membership
      const studentIds = membership.map((member) => member.student);

      await sendFirebaseNotif(
        "A new payment has been uploaded",
        `Check out the new payment: ${purpose} from ${organization.name}`,
        studentIds
      );
    }

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

    const organization = await Organization.findOne({
      $or: [
        { admin: userId }, // Check if the user is an admin
        { subAdmins: userId }, // Check if the user is a sub-admin
      ],
    });

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

    const payments = await Payments.find({
      organization: organization._id,
    })
      .sort({ createdAt: -1 })
      .populate("paidBy");

    if (payments.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No payments found",
      });
    }

    const cleanPaymentDetails = payments.map((data) => {
      const fullname = `${data.paidBy?.firstname} ${
        data.paidBy?.middlename ? data.paidBy?.middlename[0] + ". " : ""
      }${data.paidBy?.lastname}`;

      // Default to 0 unless category is "0"
      let totalCollected = 0;

      if (data.category === "0" && Array.isArray(data.membersPaid)) {
        totalCollected = data.membersPaid.reduce((sum, member) => {
          return sum + (member.amount || 0);
        }, 0);
      }

      return {
        _id: data._id,
        purpose: data.purpose,
        details: data.details,
        amount: data.amount,
        category: data.category,
        createdAt: data.createdAt,
        paidBy: fullname,
        dueDate: data.dueDate,
        ...(data.category === "0" && { totalCollected }), // include only for category "0"
      };
    });
    console.log(cleanPaymentDetails);
    res.status(200).json({
      success: true,
      data: cleanPaymentDetails,
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
          _id: memberInfo.id,
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
      data: {
        id: payment.id,
        purpose: payment.purpose,
        details: payment.details,
        amount: payment.amount,
        category: payment.category,
        membersPaid,
      },
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

    const organization = await Organization.findOne({
      $or: [
        { admin: userId }, // Check if the user is an admin
        { subAdmins: userId }, // Check if the user is a sub-admin
      ],
    });

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

    const category = payment.category;
    const allowedPaymentRoles = ["4", "1"]; // Define allowed roles for payment creation
    const allowedTransactionRoles = ["5", "1"]; // Define allowed roles for transaction creation
    console.log(category);
    console.log(admin.role);
    // Check if the user is allowed to create payments based on their role and category
    if (
      (category === "0" && !allowedPaymentRoles.includes(admin.role)) ||
      (category !== "0" && !allowedTransactionRoles.includes(admin.role))
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions",
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

    const organization = await Organization.findOne({
      $or: [
        { admin: userId }, // Check if the user is an admin
        { subAdmins: userId }, // Check if the user is a sub-admin
      ],
    });

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
    const payment = await Payments.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found!",
      });
    }
    const allowedPaymentRoles = ["4", "1"]; // Define allowed roles for payment creation
    const allowedTransactionRoles = ["5", "1"]; // Define allowed roles for transaction creation

    const category = payment.category;

    // Check if the user is allowed to create payments based on their role and category
    if (
      (category === "0" && !allowedPaymentRoles.includes(admin.role)) ||
      (category !== "0" && !allowedTransactionRoles.includes(admin.role))
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions",
      });
    }

    await Payments.findByIdAndDelete(paymentId);

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

// Function to record payment for a member
// This function is called when a member makes a payment for a specific payment record

export const recordPayment = async (req, res, next) => {
  const { member, amount, status } = req.body;
  try {
    const paymentId = req.params.id;

    const payment = await Payments.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found!",
      });
    }

    // Add the new member payment record
    payment.membersPaid.push({
      member,
      amount,
      status: status || "1", // Default to fully paid if not provided
      datePaid: Date.now(),
    });

    // Save the updated payment document
    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Payment recorded successfully!",
      data: payment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const editPaymentRecord = async (req, res, next) => {
  try {
    const paymentId = req.params.paymentId; // Payment record ID
    const memberId = req.params.memberId; // User's member ID to remove payment
    const { amount, status } = req.body; // Fields to update

    // Find the payment record
    const payment = await Payments.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found!",
      });
    }

    // Check if the member exists in the membersPaid array
    const memberIndex = payment.membersPaid.findIndex(
      (paidMember) => paidMember.member.toString() === memberId
    );

    if (memberIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Member's payment record not found!",
      });
    }

    const datePaid = Date.now();

    // Update the payment details
    if (amount !== undefined) payment.membersPaid[memberIndex].amount = amount;
    if (status !== undefined) payment.membersPaid[memberIndex].status = status;
    if (datePaid !== undefined)
      payment.membersPaid[memberIndex].datePaid = datePaid;

    // Save the updated payment record
    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Member's payment record updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteUserPayment = async (req, res, next) => {
  try {
    const paymentId = req.params.paymentId; // Payment record ID
    const memberId = req.params.memberId; // User's member ID to remove payment

    // Find the payment record
    const payment = await Payments.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found!",
      });
    }

    // Check if the member exists in the membersPaid array
    const memberIndex = payment.membersPaid.findIndex(
      (paidMember) => paidMember.member.toString() === memberId
    );

    if (memberIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Member's payment record not found!",
      });
    }

    // Remove the member's payment record
    payment.membersPaid.splice(memberIndex, 1);

    // Save the updated payment record
    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Member's payment record deleted successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
