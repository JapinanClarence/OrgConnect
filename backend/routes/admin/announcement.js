import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";
import {
  validate,
  announcementValidationRules,
} from "../../middleware/validator.js";
import {
  createAnnouncement,
  getAnnouncement,
//   getAttendance,
//   updateAttendance,
} from "../../controller/admin/announcementController.js";

const router = express.Router();

//create organization routes
router.post(
  "/event/announcement",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  announcementValidationRules(),
  validate,
  createAnnouncement
);

// router.patch(
//   "/:id",
//   authenticate,
//   authorizeRole("admin"),
//   express.json(),
//   updateAttendance
// );

router.get("/event/:id/announcement", 
    authenticate,
    authorizeRole("admin"),
    getAnnouncement
)

export default router;
