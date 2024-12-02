import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";
import {
  validate,
  organizationValidationRules,
} from "../../middleware/validator.js";
import { createOrg, findOrg, updateOrg, uploadBanner } from "../../controller/admin/orgController.js";
import upload from "../../middleware/multerConfig.js";

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

router.get("/organization/:user",
  authenticate,
  authorizeRole("admin"),
  findOrg
)
router.patch("/organization",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  updateOrg
)


router.patch(
  "/organization/uploadBanner",
  upload.single("banner"),
  authenticate,
  authorizeRole("admin"),
  uploadBanner
);
export default router;