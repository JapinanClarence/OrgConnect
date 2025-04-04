import Membership from "../../model/membershipModel.js";
import Organization from "../../model/organizationModel.js";
import { StudentModel as Student } from "../../model/UserModel.js";
import Events from "../../model/eventModel.js";
import Attendance from "../../model/attendanceModel.js";
export const getMembers = async (req, res) => {
  const userId = req.user.userId;
  try {
    const organization = await Organization.findOne({
      $or: [
        { admin: userId }, // Check if the user is an admin
        { subAdmins: userId }, // Check if the user is a sub-admin
      ],
    });

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

    // Fetch all events for the organization
    const events = await Events.find({
      organization: organization._id,
      status: "0",
    });
    const eventIds = events.map((event) => event._id);

    const memberData = await Promise.all(
      members.map(async (member) => {
        const data = await Student.findById(member.student);
        const fullname = `${data.firstname} ${
          data.middlename ? data.middlename[0] + ". " : ""
        }${data.lastname}`;

        // Count absences by checking if the student has no attendance record for each event
        const attendanceRecords = await Attendance.find({
          student: data._id,
          event: { $in: eventIds },
        });

        const attendedEventIds = attendanceRecords.map((record) =>
          record.event.toString()
        );
        const absentCount = eventIds.filter(
          (id) => !attendedEventIds.includes(id.toString())
        ).length;

        return {
          _id: data._id,
          studentId: data.studentId,
          fullname,
          email: data.email,
          birthday: data.birthday,
          gender: data.gender,
          contact: data.contactNumber,
          year: data.year,
          course: data.course,
          profilePicture: data.profilePicture,
          status: member.status,
          joinedDate: member.joinedDate,
          position: member.position,
          absentCount, // Adding absent count for the student
        };
      })
    );

    const sortedMembers = memberData.sort(
      (a, b) => new Date(b.joinedDate) - new Date(a.joinedDate)
    );

    res.status(200).json({
      success: true,
      data: sortedMembers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getApproveMembers = async (req, res) => {
  const userId = req.user.userId;
  try {
    const organization = await Organization.findOne({ admin: userId });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const members = await Membership.find({
      organization: organization._id,
      status: "1",
    });

    if (members.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No members found",
      });
    }

    // Fetch all events for the organization
    const events = await Events.find({
      organization: organization._id,
      status: "0",
    });
    const eventIds = events.map((event) => event._id);

    const memberData = await Promise.all(
      members.map(async (member) => {
        const data = await Student.findById(member.student);
        const fullname = `${data.firstname} ${
          data.middlename ? data.middlename[0] + ". " : ""
        }${data.lastname}`;

        // Count absences by checking if the student has no attendance record for each event
        const attendanceRecords = await Attendance.find({
          student: data._id,
          event: { $in: eventIds },
        });

        const attendedEventIds = attendanceRecords.map((record) =>
          record.event.toString()
        );
        const absentCount = eventIds.filter(
          (id) => !attendedEventIds.includes(id.toString())
        ).length;

        return {
          _id: data._id,
          studentId: data.studentId,
          fullname,
          email: data.email,
          birthday: data.birthday,
          gender: data.gender,
          contact: data.contactNumber,
          year: data.year,
          course: data.course,
          profilePicture: data.profilePicture,
          status: member.status,
          joinedDate: member.joinedDate,
          position: member.position,
          absentCount, // Adding absent count for the student
        };
      })
    );

    res.status(200).json({
      success: true,
      data: memberData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateMember = async (req, res) => {
  const userId = req.user.userId;
  try {
    const organization = await Organization.findOne({ admin: userId });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }
    if (!organization.active) {
      return res.status(403).json({
        success: false,
        message:
          "Organization is currently not active, limited actions granted.",
      });
    }

    const studentId = req.params.id;

    const member = await Membership.findOneAndUpdate(
      { student: studentId, organization: organization._id },
      {
        status: req.body.status,
        joinedDate: Date.now(),
      }
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
};

export const deleteMember = async (req, res) => {
  const userId = req.user.userId;
  try {
    const organization = await Organization.findOne({ admin: userId });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }
    if (!organization.active) {
      return res.status(403).json({
        success: false,
        message:
          "Organization is currently not active, limited actions granted.",
      });
    }

    const memberId = req.params.id;

    const member = await Membership.findOneAndDelete({
      student: memberId,
      organization: organization._id,
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member removed successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
