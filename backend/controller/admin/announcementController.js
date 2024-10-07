import Announcements from "../../model/announcementModel.js";
import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";

export const createAnnouncement = async (req, res, next) => {
  const { title, description } = req.body;

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

    await Announcements.create({
      title,
      description,
      organization: organization._id,
    });

    res.status(201).json({
      success: true,
      message: "Announcement created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAnnouncement = async (req, res, next) => {
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
    const announcement = await Announcements.find({
      organization: organization._id,
    });

    if (announcement.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No announcements found",
      });
    }

    res.status(200).json({
      sucess: true,
      data: announcement,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateAnnouncement = async (req, res, next) => {};
