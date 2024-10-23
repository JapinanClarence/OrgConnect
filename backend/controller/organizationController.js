import Membership from "../model/membershipModel.js";
import Organization from "../model/organizationModel.js";
import { StudentModel as Student } from "../model/UserModel.js";

export const joinOrg = async (req, res, next) => {
  const organization = req.body.organization;
  const student = req.user.userId;

  try {
    const membership = await Membership.findOne({ student });
    //verifies if student already joined the organization
    if (membership) {
      return res.status(400).json({
        success: false,
        message: "Already joined",
      });
    }

    await Membership.create({
      student,
      organization,
    });
    res.status(200).json({
      success: true,
      message: "Joined organization successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getOrg = async (req, res, next) => {
  try {
    const organization = await Organization.find().select(
      "name description about contact banner"
    );

    if (organization.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No organizations found",
      });
    }

    res.status(200).json({
      success: true,
      data: organization,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const studentOrgs = async (req, res, next) => {
  const student = req.user.userId;

  try {
    const membership = await Membership.find({ student, status:"1" }).populate("organization");

    if (membership.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No joined organizations found",
      });
    }

    const cleanData = membership.map((data) => {
     
      return {
        id: data.organization._id,
        name: data.organization.name,
        about: data.organization.about,
        banner: data.organization.banner,
        contact: data.organization.contact,
      }
    })

    res.status(200).json({
      success: true,
      data: cleanData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const findOrg = async (req, res, next) => {
  const organization = req.params.id;

  try {
    const org = await Organization.findById(organization).select(
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
