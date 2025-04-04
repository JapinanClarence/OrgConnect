import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";

import {
  getDashboardData,
  getReportsData,
} from "../../controller/admin/dashboard.js";

const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getDashboardData
);
router.get(
  "/dashboard/report",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getReportsData
);

export default router;
