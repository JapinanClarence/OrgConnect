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
 deleteOfficer,
 getOfficer
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
router.get("/officer", authenticate, authorizeRole("admin"), getOfficer);
router.delete("/officer/:id", authenticate, authorizeRole("admin"), deleteOfficer);
export default router;
