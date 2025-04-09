import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";

import {
  getCollectionReport,
  getDashboardData,
  getEventReports,
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

router.get(
  "/dashboard/eventReport/:id",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getEventReports
);

router.get(
  "/dashboard/collectionReport/:id",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getCollectionReport
);

router.get(
  "/dashboard/eventReport/:id",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getEventReports
);

export default router;
