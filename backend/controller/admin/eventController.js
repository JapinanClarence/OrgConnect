import Events from "../../model/eventModel.js";
import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";

export const createEvent = async (req, res, next) => {
  const { title, description, startDate, endDate, location } = req.body;

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
    
    const organization = await Organization.findOne({ admin });

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    await Events.create({
      title,
      description,
      startDate,
      endDate,
      location,
      organization: organization._id,
    });

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
    const organization = await Organization.findOne({ admin: userId });
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    const event = await Events.find({ organization: organization._id }).select(
      "title startDate endDate status location description"
    );

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
  try {
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
  try {
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
