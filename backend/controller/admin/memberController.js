import Membership from "../../model/membershipModel.js";
import Organization from "../../model/organizationModel.js";
import { StudentModel as Student } from "../../model/UserModel.js";

export const getMembers = async (req, res) => {
  const userId = req.user.userId;
  try {
    const organization = await Organization.findOne({ user: userId });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const members = await Membership.find({ organization: organization._id });
   
    if (members.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No members found",
      });
    }

    const memberData = await Promise.all(
      members.map(async (members) => {
        const data = await Student.findById(members.student).select(
          "studentId firstname lastname middlename email course profilePicture status"
        );
        const fullname = `${data.firstname} ${
          data.middlename ? data.middlename[0] + ". " : ""
        }${data.lastname}`;
        return {
          _id: members._id,
          studentId: data.studentId,
          fullname,
          email: data.email,
          course: data.course,
          profilePicture: data.profilePicture,
          status : members.status,
          joinDate: members.joinDate,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: memberData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateMember = async (req, res) =>{
  try {
    const memberId = req.params.id;

    const member = await Membership.findByIdAndUpdate(
      memberId,
      req.body
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}