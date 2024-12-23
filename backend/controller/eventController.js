import Membership from "../model/membershipModel.js";
import Organization from "../model/organizationModel.js";
import { StudentModel as Student } from "../model/UserModel.js";
import Events from "../model/eventModel.js";

export const getAllEvents = async (req, res) => {
  const student = req.user.userId;

  try {
    const membership = await Membership.find({ student, status: "1" });

    if (membership.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No joined organizations found",
      });
    }

    // Find events from active organizations only
    const events = await Promise.all(
      membership.map(async (data) => {
        const organization = await Organization.findOne({
          _id: data.organization,
        });

        if (organization) {
          // Fetch events only if the organization is active
          const eventList = await Events.find({
            organization: data.organization,
          }).populate("organization", "name").sort({createdAt: -1});
          return eventList; // Return the list of events for each active organization
        }

        return []; // Return an empty array if the organization is inactive
      })
    );

    // Flatten the array and filter out empty arrays (inactive organizations)
    const flattenedEvents = events.flat();

    if (flattenedEvents.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No events found",
      });
    }

    res.status(200).json({
      success: true,
      data: flattenedEvents,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getEvents = async (req, res) => {
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

    const events = await Events.find({ organization }).populate(
      "organization",
      "name"
    ).sort({createdAt: -1});

    if (events.length <= 0) {
      return res.status(200).json({
        success: false,
        message: "No events found",
      });
    }

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
