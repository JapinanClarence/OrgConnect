import Events from "../../model/eventModel.js";
import Membership from "../../model/membershipModel.js";
import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";
import { sendFirebaseNotif } from "../../util/sendNotif.js";

export const createEvent = async (req, res, next) => {
  const { title, description, startDate, endDate, location, fee, organizer } =
    req.body;

  const userId = req.user.userId;

  try {
    //verify if user exist
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const organization = await Organization.findOne({
      $or: [
        { admin: admin }, // Check if the user is an admin
        { subAdmins: admin }, // Check if the user is a sub-admin
      ],
    });

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

    if (await Events.findOne({ title })) {
      return res.status(400).json({
        success: false,
        message: "Event already exists",
      });
    }

    const event = await Events.create({
      title,
      description,
      startDate: new Date(startDate).toUTCString(),
      endDate: new Date(endDate).toUTCString(),
      location,
      organization: organization._id,
      fee,
      organizer,
      postedBy: {
        officer: userId,
        position: admin.role,
      },
    });
    //get all organization members
    const membership = await Membership.find({
      organization: organization._id,
    });

    // Extract all student IDs from membership
    const studentIds = membership.map((member) => member.student);

    await sendFirebaseNotif(
      "A new event has been uploaded",
      `Check out the new event: ${event.title} from ${organization.name}`,
      studentIds
    );
    // send notification to all members
    // membership.map(async ({ student }) => {
    //   await sendNotificationToUser(
    //     student,
    //     "A new event has been uploaded",
    //     `Check out the new event: ${event.title} from ${organization.name}`,
    //     `/organization/${organization._id}/events`
    //   );
    // });

    // await sendNotificationToAll(
    //   "A new event has been uploaded",
    //   `Check out the new event: ${event.title} from ${organization.name}`,
    //   `/organization/${organization._id}/events`,
    // );

    res.status(201).json({
      success: true,
      message: "Event created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getEvent = async (req, res, next) => {
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

    const event = await Events.find({ organization: organization._id })
      .select(
        "title startDate endDate status location description fee organizer postedBy"
      )
      .sort({ createdAt: -1 });

    if (event.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No events found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const findEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const event = await Events.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateEvent = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    //verify if user exist
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const organization = await Organization.findOne({
      $or: [
        { admin: admin }, // Check if the user is an admin
        { subAdmins: admin }, // Check if the user is a sub-admin
      ],
    });

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

    const eventId = req.params.id;

    const event = await Events.findByIdAndUpdate(eventId, req.body);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event successfully updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteEvent = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    //verify if user exist
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const organization = await Organization.findOne({
      $or: [
        { admin: admin }, // Check if the user is an admin
        { subAdmins: admin }, // Check if the user is a sub-admin
      ],
    });

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

    const eventId = req.params.id;

    const event = await Events.findByIdAndDelete(eventId, req.body);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event successfully deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
