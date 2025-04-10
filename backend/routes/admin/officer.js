import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";
import {
  validate,
  officerValidationRules,
} from "../../middleware/validator.js";
import {
  createOfficer,
  revokeRole,
  getOfficer,
  getPositions,
  updateOfficer,
} from "../../controller/admin/officersController.js";

const router = express.Router();

//create organization routes
router.patch(
  "/officer/:id",
  authenticate,
  authorizeRole("admin","secretary"),
  express.json(),
  officerValidationRules(),
  validate,
  createOfficer
);
router.patch(
  "/officer/:id/updateRole",
  authenticate,
  authorizeRole("admin", "secretary",),
  express.json(),
  updateOfficer
);
router.get(
  "/officer",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getOfficer
);
router.get(
  "/officer/positions",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getPositions
);
router.patch(
  "/officer/:id/revokeRole",
  authenticate,
  authorizeRole("admin", "secretary",),
  revokeRole
);
export default router;
