import Announcements from "../model/announcementModel.js";
import Organization from "../model/organizationModel.js";
import { StudentModel as Student } from "../model/UserModel.js";
import Membership from "../model/membershipModel.js";

export const getAllAnnouncement = async (req, res) => {
  const student = req.user.userId;
  try {
    const membership = await Membership.find({ student, status: "1" });

    if (membership.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No joined organizations found",
      });
    }

    // Find student organization announcements
    const announcements = await Promise.all(
      membership.map(async (data) => {
        const announcementList = await Announcements.find({
          organization: data.organization,
        });
        return announcementList; //
      })
    );

    const flattenedAnnouncements = announcements.flat(); // Flatten the array if needed

    if (announcements.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No announcement found",
      });
    }

    res.status(200).json({
      success: true,
      data: flattenedAnnouncements,
    });
  } catch (err) {
    return res.status(500).json({
        success: false,
        message: err.message,
      });
  }
};
export const getAnnouncement = async (req,res) =>{
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
   
    const announcements = await Announcements.find({organization});

    if (announcements.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No announcements found",
      });
    }

    res.status(200).json({
      success: true,
      data: announcements,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}