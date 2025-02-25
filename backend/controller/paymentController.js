import Membership from "../model/membershipModel.js";
import Organization from "../model/organizationModel.js";
import { StudentModel as Student } from "../model/UserModel.js";
import Events from "../model/eventModel.js";
import Payments from "../model/paymentModel.js";

export const getPayments = async (req, res) =>{
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
   
    const payments = await Payments.find({organization});

    if (payments.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No payments found",
      });
    }

      // Map through payments and add the current student's payment status
      const paymentDetails = payments.map((payment) => {
        // Look for the current student's payment in membersPaid
        const memberPayment = payment.membersPaid.find(
          (paidMember) => paidMember.member.toString() === student
        );
        // Include the payment status for the current student, if found
        return {
          _id: payment._id,
          purpose: payment.purpose,
          amount: payment.amount,
          category: payment.category,
          createdAt: payment.createdAt,
          details: payment.details,
          createdAt: payment.createdAt,
          // amountPaid : memberPayment.amount || null,
          // status: memberPayment.status || null,
          studentStatus: memberPayment
            ? {
                amountPaid: memberPayment.amount,
                status: memberPayment.status, // '0' (not fully paid) or '1' (fully paid)
              }
            : null, // Null if the student hasn't paid
        };
      });

      return res.status(200).json({
        success: true,
        data: paymentDetails,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
