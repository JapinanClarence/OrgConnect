import Membership from "../../model/membershipModel.js";
import Organization from "../../model/organizationModel.js";
import {
  OrgAdminModel as Admin,
  OrgAdminModel,
  StudentModel as Student,
} from "../../model/UserModel.js";

export const createOfficer = async (req, res) => {
  const userId = req.user.userId;
  try {
    const { officerId, position, rank } = req.body;

    // Fetch organization
    const organization = await Organization.findOne({ user: userId }).populate(
      "user"
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    // Initialize officers array if it's null or undefined
    organization.officers = organization.officers || [];

    const errorMessage = await validateOfficer(
      officerId,
      position,
      rank,
      organization
    );

    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    // Add the validated officer
    organization.officers.push({
      officerId: officerId,
      position: position,
      rank: rank,
    });

    // Save the updated organization
    await organization.save();

    res.status(200).json({
      success: true,
      message: "Officer added successfully!",
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
    // Fetch organization
    const organization = await Organization.findOne({ user: userId }).populate(
      "officers.officerId"
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    // Sort officers by rank in ascending order
    organization.officers.sort((a, b) => a.rank - b.rank);
    // Clean and format the returned data
    const cleanedOfficers = organization.officers.map((officer) => ({
      id: officer.officerId.id, // Rename officerId to officer
      firstname: officer.officerId.firstname,
      lastname: officer.officerId.lastname,
      middlename: officer.officerId.middlename,
      course: officer.officerId.course,
      year: officer.officerId.year,
      age: officer.officerId.age,
      email: officer.officerId.email,
      profilePicture: officer.officerId.profilePicture,
      position: officer.position,
      rank: officer.rank
    }));

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

const validateOfficer = async (officerId, position, rank, organization) => {
  let errorMessage;
  // Check if the officer exists and their status is "1" (approved)
  const officerExists = await Membership.findOne({ student: officerId });
  if (!officerExists || officerExists.status !== "1") {
    errorMessage = `Officer is not an approved member.`;
  }

  // Check for duplicate position or rank
  const duplicatePosition = organization.officers.some(
    (off) => off.position === position
  );
  const duplicateRank = organization.officers.some((off) => off.rank === rank);

  if (duplicatePosition || duplicateRank) {
    errorMessage = `Position ${position} or rank ${rank} already exists.`;
  }

  // Ensure the officer hasn't been added already
  const officerAlreadyAssigned = organization.officers.some(
    (off) => off.officerId.toString() === officerId
  );
  if (officerAlreadyAssigned) {
    errorMessage = `Officer has already been assigned.`;
  }

  return errorMessage;
};
