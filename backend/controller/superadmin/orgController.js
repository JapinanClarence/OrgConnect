import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";

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
      admin: userId,
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
  const id = req.params.id;

  try {
    console.log(req.body);
    const org = await Organization.findByIdAndUpdate(id, req.body);

    if (!org) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Organization updated successfully",
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
    const org = await Organization.find().populate("admin");

    if (!org) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const filteredOrgs = org.map((data) =>{
      return {
        _id: data.id,
        name: data.name,
        createdAt: data.createdAt,
        admin: data.admin.username,
        active:data.active,
        remarks:data.remarks
      }
    })

    res.status(200).json({
      success: true,
      data: filteredOrgs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};