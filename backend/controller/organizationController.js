import Membership from "../model/membershipModel.js";
import Organization from "../model/organizationModel.js";
import { StudentModel as Student } from "../model/UserModel.js";

export const joinOrg = async (req, res, next) => {
  const organization = req.body.organization;
  const student = req.user.userId;

  try {
    const membership = await Membership.findOne({ student, organization });
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
  const studentId = req.user.userId;
  try {
    // Find all memberships for the student
    const memberships = await Membership.find({ student: studentId }).select(
      "organization"
    );
    const memberOrgIds = memberships.map(
      (membership) => membership.organization
    );

    // Find organizations the student is not a member of
    const nonMemberOrgs = await Organization.find({
      _id: { $nin: memberOrgIds },
    }).select("name description about contact banner");

    if (nonMemberOrgs.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No non-member organizations found",
      });
    }

    res.status(200).json({
      success: true,
      data: nonMemberOrgs,
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
    const membership = await Membership.find({ student, status: "1" });

    if (membership.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No joined organizations found",
      });
    }

    const data = await Promise.all(
      membership.map(async (member) => {
        const organization = await Organization.findOne({
          _id: member.organization,
          active: true,
        });

        return {
          id: organization._id,
          name: organization.name,
          about: organization.about,
          banner: organization.banner,
          contact: organization.contact,
        };
      })
    );
  
    // return {
    //   id: data.organization._id,
    //   name: data.organization.name,
    //   about: data.organization.about,
    //   banner: data.organization.banner,
    //   contact: data.organization.contact,
    //   active: data.organization.active,
    // };

    res.status(200).json({
      success: true,
      data: data,
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
export const leaveOrg = async (req, res) => {
  const organization = req.params.id;
  const student = req.user.userId;

  try {
    const membership = await Membership.findOneAndDelete({
      student,
      organization,
    });

    if (!membership) {
      return res.status(200).json({
        success: false,
        message: "Organization not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Leave successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
