import { UserModel as User, StudentModel as Student } from "../model/UserModel";

export const register = async (req, res, next) => {
  const [
    studentId,
    firstname,
    lastname,
    middlename,
    age,
    contactNumber,
    course,
    email,
    password,
  ] = req.body;

  try {
    const existingStudent = await Student.findOne({ studentId });
    //check if student exists
    if (existingStudent) {
      const error = new Error("Student already exists");
      error.status = 400;
      error.success = false;
      return next(error);
    }

    const studentData = {
      studentId: studentId,
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      age: age,
      contactNumber: contactNumber,
      course: course,
    };

    const userData = {
      email: email,
      password: password,
      role: "2", //student role
    };

    //insert user data
    await User.create(userData);
    //insert student data
    await Student.create(studentData);
    
    //return status
    res.status(201).json({
      success: true,
      message: "Student created successfully",
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 500;
    error.success = false;
    return next(error);
  }
};
