import { StudentModel as Student } from "../model/UserModel.js";

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
  const { firstname, lastname, middlename, age, contactNumber, course } =
    req.body;
  try {
    //student data
    const studentData = {
        firstname, 
        lastname, 
        middlename,
        age, 
        contactNumber,
        course,
        year
    }
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
