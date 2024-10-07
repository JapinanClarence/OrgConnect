import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";
import {
  validate,
  attendanceValidationRules,
} from "../../middleware/validator.js";
import {
  createAttendance,
  getAttendance,
  updateAttendance,
} from "../../controller/admin/attendanceController.js";

const router = express.Router();

//create organization routes
router.post(
  "/",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  attendanceValidationRules(),
  validate,
  createAttendance
);

router.patch(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  updateAttendance
);

router.get("/:id", 
    authenticate,
    authorizeRole("admin"),
    getAttendance
)

export default router;
