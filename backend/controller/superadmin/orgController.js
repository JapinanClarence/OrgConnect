import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";
import { getCloudinaryPublicId } from "../../util/helper.js";
import { v2 as cloudinary } from "cloudinary";

export const createOrg = async (req, res, next) => {
  const { name, type } = req.body;

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

    if (user.active) {
      return res.status(400).json({
        success: false,
        message: "Account already created an organization",
      });
    }

    const organization = await Organization.findOne({ name });
    //verify if organization name already exists
    if (organization) {
      return res.status(400).json({
        success: false,
        message: "Organization name already exists",
      });
    }

    await Organization.create({
      name,
      about,
      contact,
      type,
      user: userId,
    });

    //activate account after creating an org
    await Admin.findByIdAndUpdate(userId, {
      active: true,
    });

    res.status(201).json({
      success: true,
      message: "Organization created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const updateOrg = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const org = await Organization.findOneAndUpdate({ user: userId }, req.body).select(
      "name description about contact banner"
    );

    if (!org) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    res.status(200).json({
      success: true,
      data: org,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getOrg = async (req, res, next) => {
  const email = req.params.user;

  try {
    const org = await Organization.find();

    if (!org) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    res.status(200).json({
      success: true,
      data: org,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};