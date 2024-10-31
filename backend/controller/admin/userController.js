import { OrgAdminModel as Admin } from "../../model/UserModel.js";
import { UserModel } from "../../model/UserModel.js";
import { getCloudinaryPublicId } from "../../util/helper.js";
import { v2 as cloudinary } from "cloudinary";

export const findUser = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const user = await Admin.findById(userId).select(
      "firstname lastname middlename username email profilePicture role active"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await UserModel.findByIdAndUpdate(userId, req.body);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const uploadPicture = async (req, res) => {
  const userId = req.user.userId;

  const profilePicture = req.file?.path;
 
  try {
    const admin = await UserModel.findById(userId);

    // If the admin has an existing profile picture in Cloudinary, delete it
    if (admin.profilePicture) {
      const publicId = `orgconnect/${getCloudinaryPublicId(
        admin.profilePicture
      )}`;

      await cloudinary.uploader.destroy(publicId);
      console.log("Old profile picture deleted from Cloudinary");
    }

    const user = await UserModel.findByIdAndUpdate(userId, { profilePicture });

    //verify if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //send response message
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: profilePicture,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
