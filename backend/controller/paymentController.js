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

    // Find student organization payments
    // const payments = await Promise.all(
    //   membership.map(async (data) => {
    //     const eventList = await Payments.find({
    //       organization: data.organization,
    //     });
    //     return eventList; // Return the list of pyaments for each organization
    //   })
    // );

    // // `payments` is now an array of arrays, so you might want to flatten it
    // const flattenedPayments = payments.flat(); // Flatten the array if needed

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
