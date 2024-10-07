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
  "/event/announcement",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  announcementValidationRules(),
  validate,
  createAnnouncement
);

router.patch(
  "/announcement/:id",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  updateAnnouncement
);

router.delete(
    "/announcement/:id",
    authenticate,
    authorizeRole("admin"),
    deleteAnnoucement
  );

router.get("/event/:id/announcement", 
    authenticate,
    authorizeRole("admin"),
    getAnnouncement
)

router.get(
    "/announcement/:id",
    authenticate,
    authorizeRole("admin"),
    findAnnouncement
  );

export default router;
