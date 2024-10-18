import Membership from "../../model/membershipModel.js";
import Organization from "../../model/organizationModel.js";
import {
  OrgAdminModel as Admin,
  OrgAdminModel,
  StudentModel as Student,
} from "../../model/UserModel.js";

export const createOfficer = async (req, res) => {
  const userId = req.user.userId;
  const memberId = req.params.id;
  try {
    const { position, rank } = req.body;

    // Fetch organization
    const organization = await Organization.findOne({ user: userId }).populate(
      "user"
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "User or organization not found",
      });
    }

    const memberPositionValidity = await Membership.findOne({ position: position, rank: rank });
    if (memberPositionValidity?.position === position) {
      return res.status(400).json({
        success: false,
        message: `Position ${position} was already taken.`,
      });
    }

    if (memberPositionValidity?.rank === rank) {
      return res.status(400).json({
        success: false,
        message: `Rank ${rank} was already taken.`,
      });
    }

    const member =  await Membership.findOne(
      { student: memberId }
    );

    if(member.status === "0"){
      return res.status(400).json({
        success: false,
        message: `Member should be approved`,
      });
    }

    if(member.position !== "member" || member.rank !== "999"){
      return res.status(400).json({
        success: false,
        message: `Member was already assigned`,
      });
    }
  
    await Membership.findOneAndUpdate({student: memberId}, {position, rank});
    res.status(200).json({
      success: true,
      message: "Role added successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteOfficer = async (req, res) => {
  const officerId = req.params.id;
  const userId = req.user.userId;

  try {
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

    // Find and remove the officer from the organization’s officers array
    const updatedOfficers = organization.officers.filter(
      (officer) => officer._id.toString() !== officerId
    );

    if (updatedOfficers.length === organization.officers.length) {
      return res.status(404).json({
        success: false,
        message: "Officer not found",
      });
    }

    // Update the officers array and save the organization
    organization.officers = updatedOfficers;
    await organization.save();

    res.status(200).json({
      success: true,
      message: "Officer removed successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getOfficer = async (req, res) => {
  const userId = req.user.userId;
  try {
    const organization = await Organization.findOne({ user: userId });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }
    const officers = await Membership.find({
      organization: organization._id,
      position: { $ne: "member" }, // Exclude members with position "Member"
    }).populate("student");

    if (officers.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No members found",
      });
    }

    // console.log(officers)

    // Sort officers by rank in ascending order
    officers.sort((a, b) => a.rank - b.rank);
    // Clean and format the returned data
    const cleanedOfficers = officers.map((officer) => {
      const fullname = `${officer.student.firstname} ${
        officer.student.middlename ? officer.student.middlename[0] + ". " : ""
      }${officer.student.lastname}`;
      return {
        id: officer.student._id,
        fullname: fullname,
        course: officer.student.course,
        year: officer.student.year,
        age: officer.student.age,
        email: officer.student.email,
        profilePicture: officer.student.profilePicture,
        position: officer.position,
        rank: officer.rank,
      };
    });

    res.status(200).json({
      success: true,
      data: cleanedOfficers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
