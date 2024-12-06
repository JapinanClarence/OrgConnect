import AcademicYear from "../../model/academicYearModel.js";
import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";

export const createOrg = async (req, res, next) => {
  const { name, type, admin } = req.body;
  
  try {
    //verify if user exist
    const user = await Admin.findById(admin);

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

    if(admin === organization.admin){
      return  res.status(400).json({
        success:false,
        message: "Admin is already assigned to an organization."
      })
    }

    const currentAY = await AcademicYear.findOne({isCurrent: true});
    await Organization.create({
      name,
      type,
      admin: admin,
      academicYear: currentAY
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