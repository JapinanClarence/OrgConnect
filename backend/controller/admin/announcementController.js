import Announcements from "../../model/announcementModel.js";
import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";

export const createAnnouncement = async (req, res, next) => {
  const { title, description, category } = req.body;

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
    await Announcements.create({
      title,
      description,
      organization: organization._id,
      category,
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
    const announcement = await Announcements.find({
      organization: organization._id,
    }).sort({createdAt: -1});

    if (announcement.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No announcements found",
      });
    }

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const findAnnouncement = async (req, res, next) => {
  try {
    const announcementId = req.params.id;

    const announcement = await Announcements.findById(announcementId);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateAnnouncement = async (req, res, next) => {
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
    
    const announcementId = req.params.id;

    const announcement = await Announcements.findByIdAndUpdate(
      announcementId,
      req.body
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteAnnoucement = async (req, res, next) => {
  try {
    const announcementId = req.params.id;

    const announcement = await Announcements.findByIdAndDelete(announcementId);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
