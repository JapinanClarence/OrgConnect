import express from "express";
import {
  academicYearValidationRules,
  validate,
} from "../../middleware/validator.js";
import {
  authenticate,
  authorizeRole,
} from "../../middleware/authMiddleware.js";

import { getDashboardData } from "../../controller/superadmin/dashboardController.js";
const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorizeRole("superadmin"),
  getDashboardData
);

export default router;
