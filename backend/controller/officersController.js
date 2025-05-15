import Membership from "../model/membershipModel.js";
import Organization from "../model/organizationModel.js";
import { StudentModel as Student } from "../model/UserModel.js";
import Events from "../model/eventModel.js";
import Payments from "../model/paymentModel.js";

export const getOfficers = async (req, res) => {
  const student = req.user.userId;
  const organization = req.params.id;
  try {
    const membership = await Membership.findOne({ student, organization });

    if (!membership) {
      return res.status(200).json({
        success: false,
        message: "Organization not found",
      });
    }

    const officers = await Membership.find({
      organization,
      position: { $ne: "member" },
    }).populate("student");

    if (officers.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No officers found found",
      });
    }
    const organizations = await Organization.findById(organization);
   
    // Validate position
    const validPositions = organizations.officerPositions;
    //create a map of positions to their rank
    const positionRankMap = validPositions.reduce((acc, pos) => {
      acc[pos.position.toLowerCase()] = pos.rank; // Convert to lower case for consistency
      return acc;
    }, {});

    const officerData = officers.map((officer) => {
      return {
        id: officer.student._id,
        firstname: officer.student.firstname,
        lastname: officer.student.lastname,
        middlename: officer.student.middlename,
        email: officer.student.email,
        studentId: officer.student.studentId,
        year: officer.student.year,
        course: officer.student.course,
        position: officer.position,
        profilePicture: officer.student.profilePicture,
        semester: officer.officerTerm.semester,
        schoolYear: officer.officerTerm.schoolYear,
      };
    });

    // Sort the cleaned officers based on their rank in descending order
    officerData.sort((a, b) => {
      return (
        (positionRankMap[a.position.toLowerCase()] || -Infinity) -
        (positionRankMap[b.position.toLowerCase()] || -Infinity)
      );
    });

    // console.log(officers)
    res.status(200).json({
      success: true,
      data: officerData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
