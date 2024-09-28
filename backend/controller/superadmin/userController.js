import { OrgAdminModel as Admin } from "../../model/UserModel.js";

export const createUser = async (req, res, next) => {
  const { firstname, lastname, middlename, username, email, password } =
    req.body;
  try {
    const user = await Admin.findOne({ $or: [{ username }, { email }] });
    //verify if email is already taken
    if (user) {
      return res.status(400).json({
        success: false,
        message:
          user.username === username
            ? "Username already taken"
            : "Email already taken",
      });
    }

    await Admin.create({
      firstname,
      lastname,
      middlename,
      username,
      email,
      password,
      role: "1", //default admin role
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const role = "1";

    const user = await Admin.find({ role }).select(
      "firstname lastname middlename username email role active"
    );

    if (user.length <= 0) {
      return res.status(200).json({
        success: true,
        message: "No users found",
      });
    }

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

export const findUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await Admin.findById(userId).select(
      "firstname lastname middlename username email role active"
    );

    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User not found",
      });
    }
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
