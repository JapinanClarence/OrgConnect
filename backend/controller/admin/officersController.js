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
    console.log(req.body)
    const memberPositionValidity = await Membership.find();
 
    const validate = memberPositionValidity.map((validity) => {
      if (validity?.position === position) {
        return `Position ${position} was already taken`;
      } else if (validity?.rank === rank) {
        return `Rank ${rank} was already taken`;
      }
    }).filter((msg) => msg !== undefined);;
   
    if (validate.length > 0) {
      return res.status(400).json({
        success: false,
        message: validate.join(", ")
      });
    }
    
    const member = await Membership.findOne({ student: memberId });

    if (member.status === "0") {
      return res.status(400).json({
        success: false,
        message: `Member should be approved`,
      });
    }

    if (member.position !== "member" || member.rank !== "999") {
      return res.status(400).json({
        success: false,
        message: `Member was already assigned`,
      });
    }


    await Membership.findOneAndUpdate(
      { student: memberId },
      { position, rank }
    );
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
    const organization = await Organization.findOne({ user: userId }).populate(
      "user"
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "User or organization not found",
      });
    }

    const officer = await Membership.findOneAndUpdate(
      { student: memberId },
      {
        position: "member",
        rank: "999",
      }
    );
    console.log(memberId);
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
