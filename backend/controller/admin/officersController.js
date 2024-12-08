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
    const { position } = req.body;

    // Fetch organization
    const organization = await Organization.findOne({ admin: userId }).populate(
      "admin"
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "User or organization not found",
      });
    }

    if (!organization.active) {
      return res.status(403).json({
        success: false,
        message:
          "Organization is currently not active, limited actions granted.",
      });
    }
    

    const validPositions = organization.officerPositions;

    // Validate position
    const existingPositions = validPositions.map((officer) => officer.position);

    // Check if the provided position exists in the list of existing positions
    if (!existingPositions.includes(position.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Position "${position}" is not valid. Valid positions are: ${existingPositions.join(
          ", "
        )}.`,
      });
    }

    const positionAvailability = await Membership.find({organization: organization._id});
   
    // Check if the position is taken
    const takenPosition = positionAvailability.find(
      (takenPosition) => takenPosition?.position === position
    );

    if (takenPosition) {
      return res.status(400).json({
        success: false,
        message: `Position ${position} is already taken.`,
      });
    }
    const member = await Membership.findOne({ student: memberId, organization: organization._id });

    if (member.status === "0") {
      return res.status(400).json({
        success: false,
        message: `Officer should be an approved member`,
      });
    }

    if (member.position !== "member") {
      return res.status(400).json({
        success: false,
        message: `Member was already assigned`,
      });
    }

    await Membership.findOneAndUpdate({ student: memberId, organization: organization._id }, { position });
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
export const updateOfficer = async (req, res) => {
  const userId = req.user.userId;
  const memberId = req.params.id;
  try {

    const { position } = req.body;
 

    // Fetch organization
    const organization = await Organization.findOne({ admin: userId }).populate(
      "admin"
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "User or organization not found",
      });
    }

    if (!organization.active) {
      return res.status(403).json({
        success: false,
        message:
          "Organization is currently not active, limited actions granted.",
      });
    }
    
    const validPositions = organization.officerPositions;

    // Validate position
    const existingPositions = validPositions.map((officer) => officer.position);

    // Check if the provided position exists in the list of existing positions
    if (!existingPositions.includes(position.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Position "${position}" is not valid. Valid positions are: ${existingPositions.join(
          ", "
        )}.`,
      });
    }

    const positionAvailability = await Membership.find({organization: organization._id});

    // Check if the position is taken
    const takenPosition = positionAvailability.find(
      (takenPosition) => takenPosition?.position === position
    );

    if (takenPosition) {
      return res.status(400).json({
        success: false,
        message: `Position ${position} is already taken.`,
      });
    }
  
    await Membership.findOneAndUpdate({ student: memberId, organization: organization._id }, { position });
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
export const revokeRole = async (req, res) => {
  const memberId = req.params.id;
  const userId = req.user.userId;

  try {
    // Fetch organization
    const organization = await Organization.findOne({ admin: userId }).populate(
      "admin"
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "User or organization not found",
      });
    }
    if (!organization.active) {
      return res.status(403).json({
        success: false,
        message:
          "Organization is currently not active, limited actions granted.",
      });
    }
    
    const officer = await Membership.findOneAndUpdate(
      { student: memberId, organization: organization._id },
      {
        position: "member",
      }
    );

    if (!officer) {
      return res.status(404).json({
        success: false,
        message: "Officer not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Role revoked",
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
    const organization = await Organization.findOne({ admin: userId });
   
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
    console.log(officers)
    if (officers.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No members found",
      });
    }
   

    // Validate position
    const validPositions = organization.officerPositions;
    // console.log(validPositions)
    //create a map of positions to their rank
    const positionRankMap = validPositions.reduce((acc, pos) => {
      acc[pos.position.toLowerCase()] = pos.rank; // Convert to lower case for consistency
      return acc;
    }, {});

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

    // Sort the cleaned officers based on their rank in descending order
    cleanedOfficers.sort((a, b) => {
      return (
        (positionRankMap[a.position.toLowerCase()] || -Infinity) -
        (positionRankMap[b.position.toLowerCase()] || -Infinity)
      );
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
export const getPositions = async (req, res) => {
  const userId = req.user.userId;
  try {
    const organization = await Organization.findOne({ admin: userId });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const cleanData = organization.officerPositions.map(
      (positions) => positions.position
    );
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
