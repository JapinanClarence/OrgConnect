import {
  UserModel as Admin
} from "../../model/UserModel.js";

export const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
      //verify if email was already used
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    await Admin.create({
        email: email,
        password: password,
        role: "1"//default admin role 
    })

    res.status(201).json({
        success: true,
        message: "User created successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
