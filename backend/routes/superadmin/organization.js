import express from "express";
import {
  organizationValidationRules,
  validate,
} from "../../middleware/validator.js";
import {
  authenticate,
  authorizeRole,
} from "../../middleware/authMiddleware.js";

import { getOrg, createOrg, updateOrg } from "../../controller/superadmin/orgController.js";
const router = express.Router();

//create organization routes
router.post(
  "/organization",
  authenticate,
  authorizeRole("superadmin"),
  express.json(),
  organizationValidationRules(),
  validate,
  createOrg
);
router.patch("/organization/:id", authenticate, authorizeRole("superadmin"), express.json(), updateOrg);
router.get("/organization/", authenticate, authorizeRole("superadmin"), getOrg);

export default router;