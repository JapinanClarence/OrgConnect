import AcademicYear from "../../model/academicYearModel.js";
import Organization from "../../model/organizationModel.js";
import { OrgAdminModel as Admin, UserModel } from "../../model/UserModel.js";

export const getDashboardData = async (req, res) =>{
    const userId = req.user.userId;
    try {
      
        const admins = await Admin.countDocuments({
            role: "1"
        })
      
        const orgs = await getOrg();

        const currentSemester = await AcademicYear.findOne({isCurrent: true});

        const totalActiveOrgs = orgs.filter((data) => data.active === true);
        
        const totalInactiveOrgs= orgs.filter((data) => data.active === false);

        res.status(200).json({
            success: true,
            adminCount :admins,
            orgData :orgs,
            currentSemester,
            totalActiveOrgs,
            totalInactiveOrgs
        })

    } catch (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
}
const getOrg = async () => {
    try {
      const orgs = await Organization.find().populate("admin");
  
      if (!orgs || orgs.length === 0) {
        return []; // Return an empty array if no organizations are found
      }
  
      // Map organization data and format the admin's full name
      const filteredOrgs = await Promise.all(orgs.map(async (data) => {
        const admin = await UserModel.findById(data.admin);
        return {
          _id: data.id,
          name: data.name,
          createdAt: data.createdAt,
          admin: admin.username,
          active: data.active,
          remarks: data.remarks,
          type: data.type,
        };
      }));
      console.log(filteredOrgs)
      return filteredOrgs;
    } catch (err) {
      console.error("Error fetching organizations:", err.message);
      throw new Error("Failed to fetch organizations");
    }
  };
  