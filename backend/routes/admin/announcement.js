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
  deleteAnnoucement,
  findAnnouncement,
  getAnnouncement,
  updateAnnouncement,
//   getAttendance,
//   updateAttendance,
} from "../../controller/admin/announcementController.js";

const router = express.Router();

//create organization routes
router.post(
  "/announcement",
  authenticate,
  authorizeRole("admin","secretary"),
  express.json(),
  announcementValidationRules(),
  validate,
  createAnnouncement
);

router.patch(
  "/announcement/:id",
  authenticate,
  authorizeRole("admin","secretary"),
  express.json(),
  updateAnnouncement
);

router.delete(
    "/announcement/:id",
    authenticate,
    authorizeRole("admin","secretary"),
    deleteAnnoucement
  );

router.get("/announcement", 
    authenticate,
    authorizeRole("admin", "secretary", "treasurer", "auditor"),
    getAnnouncement
)

router.get(
    "/announcement/:id",
    authenticate,
    authorizeRole("admin", "secretary", "treasurer", "auditor"),
    findAnnouncement
  );

export default router;
