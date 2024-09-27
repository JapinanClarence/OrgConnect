import {
  UserModel as User,
  StudentModel as Student,
} from "../model/UserModel.js";
import jwt from "jsonwebtoken";

const ACCESS_KEY = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_KEY = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

export const register = async (req, res, next) => {
  const {
    studentId,
    firstname,
    lastname,
    middlename,
    age,
    contactNumber,
    course,
    email,
    password,
  } = req.body;

  try {
    const existingStudent = await Student.findOne({$or: [{ studentId }, { email }]});
    //check if student exists
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: existingStudent.studentId === studentId ? "Student already exists" : "Email already taken",
      });
    }

    const studentData = {
      studentId: studentId,
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      age: age,
      contactNumber: contactNumber,
      course: course,
      email: email,
      password: password,
      profilePicture: null
    };

    await Student.create(studentData);

    //return status
    res.status(201).json({
      success: true,
      message: "Student created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //generate jwt token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      ACCESS_KEY,
      { expiresIn: ACCESS_EXPIRATION }
    );
    //generate refresh token
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_KEY, {
      expiresIn: REFRESH_EXPIRATION,
    });
    //store refresh token to cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });
    //send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      role: user.role,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
