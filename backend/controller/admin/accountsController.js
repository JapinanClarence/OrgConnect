import Organization from "../../model/organizationModel.js";
import { OrgAdminModel, UserModel } from "../../model/UserModel.js";

export const getAccounts = async (req, res) => {
  const userId = req.user.userId;
  try {
    const organization = await Organization.findOne({
      $or: [
        { admin: userId }, // Check if the user is an admin
        { subAdmins: userId }, // Check if the user is a sub-admin
      ],
    }).sort({ createdAt: -1 });

    const accounts = await Promise.all(
      organization.subAdmins.map(async (account) => {
        return await UserModel.findById(account).select(
          "firstname lastname middlename username email profilePicture role active createdAt"
        );
      })
    );
    if (!accounts) {
      return res.status(404).json({
        success: false,
        message: "No accounts found",
      });
    }
    const sortAccounts = accounts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    console.log(sortAccounts);
    res.status(200).json({
      success: true,
      data: sortAccounts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createAccount = async (req, res) => {
  const { username, email, password, role } = req.body;
  const userId = req.user.userId;
  try {
    const user = await UserModel.findOne({ $or: [{ username }, { email }] });
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

    const account = await OrgAdminModel.create({
      username,
      email,
      password,
      role, //default admin role
    });

    const organization = await Organization.findOne({
      $or: [
        { admin: userId }, // Check if the user is an admin
        { subAdmins: userId }, // Check if the user is a sub-admin
      ],
    });

    organization.subAdmins.push(account._id);
    await organization.save();

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
