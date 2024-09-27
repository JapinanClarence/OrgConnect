import { UserModel as User } from "../model/UserModel.js";

export const findUser = async (req, res, next) => {
  //token user id
  const userId = req.user.userId;
  try {
    //verifies if user exists
    const user = await User.findById(userId).select([
        "studentId",
        "firstname",
        "lastname",
        "middlename",
        "age",
        "email",
        "contactNumber",
        "course",
        "profilePicture"
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
