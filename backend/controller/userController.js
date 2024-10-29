import { StudentModel as Student } from "../model/UserModel.js";
import { getCloudinaryPublicId } from "../util/helper.js";
import { v2 as cloudinary } from "cloudinary";

export const findUser = async (req, res, next) => {
  //token user id
  const userId = req.user.userId;
  try {
    //verifies if user exists
    const user = await Student.findById(userId).select([
      "studentId",
      "firstname",
      "lastname",
      "middlename",
      "birthday",
      "email",
      "username",
      "gender",
      "contactNumber",
      "course",
      "year",
      "profilePicture",
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //send user data
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res, next) => {
  const userId = req.user.userId;
  //ensures that these fields are only updated
  const {
    firstname,
    lastname,
    middlename,
    email,
    gender,
    username,
    birthday,
    contactNumber,
    course,
    year,
  } = req.body;
  try {
    const student = await Student.findById(userId);

    if (student.email !== email) {
      const isExists = await Student.findOne({ email });
      if (isExists) {
        return res.status(400).json({
          success: false,
          message: "Email already taken!",
        });
      }
    }

    //student data
    const studentData = {
      firstname,
      lastname,
      middlename,
      birthday,
      username,
      gender,
      email,
      contactNumber,
      course,
      year,
    };
    //update student info
    const user = await Student.findByIdAndUpdate(userId, studentData);

    //verify if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //send response message
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadPicture = async (req, res) => {
  const userId = req.user.userId;
  const {
    firstname,
    lastname,
    middlename,
    gender,
    birthday,
    email,
    username,
    contactNumber,
    course,
    year,
  } = req.body;
  const profilePicture = req.file?.path;

  try {
    const student = await Student.findById(userId);

    if (student.email !== email) {
      const isExists = await Student.findOne({ email });
      if (isExists) {
        return res.status(400).json({
          success: false,
          message: "Email already taken!",
        });
      }
    }

    
    // If the student has an existing profile picture in Cloudinary, delete it
    if (student.profilePicture) {
      const publicId = `orgconnect/${getCloudinaryPublicId(
        student.profilePicture
      )}`;

      await cloudinary.uploader.destroy(publicId);
      console.log("Old profile picture deleted from Cloudinary");
    }


    //student data
    const studentData = {
      firstname: firstname || student.firstname,
      lastname: lastname || student.lastname,
      middlename: middlename || student.middlename,
      birthday: birthday || student.birthday,
      username: username || student.username,
      gender: gender || student.gender,
      email: email || student.email,
      contactNumber: contactNumber || student.contactNumber,
      course: course || student.course,
      year: year || student.year,
      profilePicture,
    };

    const user = await Student.findByIdAndUpdate(userId, studentData);

    //verify if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //send response message
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
