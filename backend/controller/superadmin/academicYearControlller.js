import Organization from "../../model/organizationModel.js";
import { UserModel as Admin } from "../../model/UserModel.js";
import AcademicYear from "../../model/academicYearModel.js";

export const createAcadYear = async (req, res, next) => {

  const userId = req.user.userId;

  try {
    //verify if user exist
    const user = await Admin.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await AcademicYear.create({
      academicYear : req.body.academicYear,
      semester: req.body.semester,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    res.status(201).json({
      success: true,
      message: "Academic year added",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const updateAcadyear = async (req, res, next) => {
  const id = req.params.id;
  
  try {
    const academicYear = await AcademicYear.findById(id);
    

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }
 
    // Check if the user is trying to set this academic year to active
    if (req.body.isCurrent) {
      // Find if another active academic year already exists
      const findActiveAY = await AcademicYear.findOne({
        isCurrent: true,
        _id: { $ne: id }, // Exclude the current academic year
      });

      if (findActiveAY) {
        return res.status(400).json({
          success: false,
          message: "An active academic year already exists.",
        });
      }
    }
    await AcademicYear.findByIdAndUpdate(id, req.body)

    res.status(200).json({
      success: true,
      message: "Academic year updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getAcademicYears = async (req, res, next) => {
 

  try {
    const org = await AcademicYear.find();

    if (!org) {
      return res.status(404).json({
        success: false,
        message: "No academic year found",
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