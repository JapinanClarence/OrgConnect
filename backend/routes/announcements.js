import express from "express";
import { authorizeRole, authenticate } from "../middleware/authMiddleware.js";

import { getAnnouncement } from "../controller/announcementController.js";

const router = express.Router();
router.get(
    "/announcement",
    authenticate,
    authorizeRole("student"),
    getAnnouncement
  );
  

export default router;
