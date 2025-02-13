import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";

import { getDashboardData, getReportsData } from "../../controller/admin/dashboard.js";

const router = express.Router();

router.get("/dashboard", authenticate, authorizeRole("admin"), getDashboardData);
router.get("/dashboard/report", authenticate, authorizeRole("admin"), getReportsData)

export default router;
