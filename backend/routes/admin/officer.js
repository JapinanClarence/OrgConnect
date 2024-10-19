import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";
import {
  validate,
    officerValidationRules
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
  authorizeRole("admin"),
  express.json(),
  officerValidationRules(),
  validate,
  createOfficer
);
router.patch("/officer/:id/updateRole", authenticate, authorizeRole("admin"), express.json(), updateOfficer);
router.get("/officer", authenticate, authorizeRole("admin"), getOfficer);
router.get("/officer/positions", authenticate, authorizeRole("admin"), getPositions);
router.patch("/officer/:id/revokeRole", authenticate, authorizeRole("admin"), revokeRole);
export default router;
