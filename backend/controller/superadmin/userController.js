import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin } from "../../model/UserModel.js";

export const createUser = async (req, res, next) => {
  const { username, email, password } =
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
      "username email role active profilePicture"
    ).sort({createdAt: -1});

    if (user.length <= 0) {
      return res.status(200).json({
        success: false,
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
      " username email role active profilePicture"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
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

// export const updateUser = async (req, res) => {

//   const userId = req.params.id;
//   try {
//     const user = await Admin.findByIdAndUpdate(userId, req.body);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found!",
//       });
//     }
 
//     const organization = await Organization.findOneAndUpdate(
//       {
//         admin: userId,
//       },
//       req.body
//     );

//     if (!organization) {
//       return res.status(404).json({
//         success: false,
//         message: "Organization not found!",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully!",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
