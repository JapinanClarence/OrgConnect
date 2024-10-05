import Events from "../../model/eventModel.js";
import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";

export const createEvent = async (req, res, next) => {
  const {
    title,
    description,
    startDate,
    endDate,
    checkIn,
    checkOut,
    location,
  } = req.body;

  const userId = req.user.userId;

  try {
    //verify if user exist
    const user = await Admin.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const organization = await Organization.findOne({ user });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    await Events.create({
        title,
        description,
        startDate,
        endDate,
        checkIn,
        checkOut,
        location,
        organization: organization._id
    })

    res.status(201).json({
        success: true,
        message: "Event created",
      });
      
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
