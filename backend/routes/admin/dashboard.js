import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";

import { getDashboardData } from "../../controller/admin/dashboard.js";

const router = express.Router();

router.get("/dashboard", authenticate, authorizeRole("admin"), getDashboardData);


export default router;
