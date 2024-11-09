import express from "express";
import { authorizeRole, authenticate } from "../middleware/authMiddleware.js";
import { absentCount, getAttendance } from "../controller/attendanceController.js";
const router = express.Router();

router.get(
    "/totalAbsent",
    authenticate,
    authorizeRole("student"),
    absentCount
  );

  router.get(
    "/attendance",
    authenticate,
    authorizeRole("student"),
    getAttendance
  );
//   router.get(
//     "/organization/:id/announcements",
//     authenticate,
//     authorizeRole("student"),
//     getAnnouncement
//   );
  
  

export default router;
