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
        });

        // Only return organization data if it is active
        if (organization) {
          return {
            id: organization._id,
            name: organization.name,
            about: organization.about,
            banner: organization.banner,
            contact: organization.contact,
          };
        }
        return null; // Return null if organization is inactive
      })
    );

    // Filter out null values (inactive organizations) from the result
    const activeOrganizations = data.filter((org) => org !== null);

    res.status(200).json({
      success: true,
      data: activeOrganizations,
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

export const searchOrg = async (req, res) =>{
  try {
    const userId = req.user.userId;
    const { query } = req.query;

    const organizations = await Organization.find({
      name: { $regex: query, $options: "i" }, // 'i' for case-insensitive
    });

    const filterOrgs = await Promise.all(
      organizations.map(async (data) =>{
        const isMember = await Membership.findOne({organization: data._id, student: userId});
        return {
          _id: data._id,
          name: data.name,
          about:data.about,
          banner:data.banner,
          active: data.active,
          isMember: isMember ? true : false
        }
      })
    )

    const activeOrgs = filterOrgs.filter((orgs) => orgs.active === true);
  

    res.status(200).json({success: true, data: activeOrgs});

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}