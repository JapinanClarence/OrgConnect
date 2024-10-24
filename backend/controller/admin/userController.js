import { OrgAdminModel as Admin } from "../../model/UserModel.js";

export const findUser = async (req, res, next) => {
    const userId = req.user.userId;
    try {
      const user = await Admin.findById(userId).select(
        "firstname lastname middlename username email role active"
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

  export const updateUser = async (req, res) =>{
    const userId = req.user.userId;
    try {
      console.log(userId)
      const user = await Admin.findByIdAndUpdate(
        userId,
        req.body
      );
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "User updated successfully!",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }