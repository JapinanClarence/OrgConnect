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

    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
