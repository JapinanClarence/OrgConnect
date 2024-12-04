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
    const academicYear = await AcademicYear.findByIdAndUpdate(id, req.body);
   
    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

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