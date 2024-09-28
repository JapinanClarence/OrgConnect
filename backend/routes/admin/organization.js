import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";
import {
  validate,
  organizationValidationRules,
} from "../../middleware/validator.js";
import { createOrg } from "../../controller/admin/orgController.js";

const router = express.Router();

//create organization routes
router.post(
  "/organization",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  organizationValidationRules(),
  validate,
  createOrg
);

export default router;