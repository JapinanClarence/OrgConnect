import Membership from "../model/membershipModel.js";
import Organization from "../model/organizationModel.js";
import { StudentModel as Student } from "../model/UserModel.js";

export const joinOrg = async (req, res, next) => {
  const organization = req.body.organization;
  const student = req.user.userId;

  try {
    const membership = await Membership.findOne({ organization });
    //verifies if student already joined the organization
    if (membership) {
      return res.status(400).json({
        success: false,
        message: "Already a member",
      });
    }

    await Membership.create({
      student,
      organization,
    });
    res.status(200).json({
      success: true,
      message: "Joined organization successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getOrg = async (req, res, next) => {
    try{
        const organization = await Organization.find().select("name description about contact banner")
        
        if(organization.length <= 0){
            return res.status(200).json({
                success: false,
                message: "No organizations foun"
            })
        }

        res.status(200).json({
            success: true,
            data: organization
        })
    
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
          });
    }
}
