import Organization from "../../model/organizationModel.js";
import {
  OrgAdminModel as Admin,
  OrgAdminModel,
} from "../../model/UserModel.js";

export const createOfficer = async (req, res) => {
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

    // Fetch existing officers
    const existingOfficers = organization.officers;

    // Validate and append new officers
    const validatedNewOfficers = validateOfficer(req.body, existingOfficers);

    // Update organization with new officer list
    organization.officers = [...existingOfficers, ...validatedNewOfficers];
    await organization.save();

    res.status(200).json({
      success: true,
      message: "Officers created successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
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
    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const organization = await Organization.findOne({ user }).select(
      "officers"
    );
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    // Sort officers by rank in ascending order
    organization.officers.sort((a, b) => a.rank - b.rank);

    res.status(200).json({
      success: true,
      data: organization.officers,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

function validateOfficer(newOfficers, existingOfficers) {
  const positionsSet = new Set(
    existingOfficers.map((officer) => officer.position)
  );
  const ranksSet = new Set(existingOfficers.map((officer) => officer.rank));

  const data = newOfficers.map((officer) => {
    if (positionsSet.has(officer.position)) {
      throw new Error(`Duplicate position found: ${officer.position}`);
    }
    if (ranksSet.has(officer.rank)) {
      throw new Error(`Duplicate rank found: ${officer.rank}`);
    }

    // Add position and rank to the sets to track uniqueness
    positionsSet.add(officer.position);
    ranksSet.add(officer.rank);

    return {
      firstname: officer.firstname,
      lastname: officer.lastname,
      middlename: officer.middlename,
      position: officer.position,
      rank: officer.rank,
      profilePicture: officer.profilePicture || null, // Optional, if provided
    };
  });

  return data;
}
