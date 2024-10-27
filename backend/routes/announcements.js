import express from "express";
import { authorizeRole, authenticate } from "../middleware/authMiddleware.js";

import { getAllAnnouncement } from "../controller/announcementController.js";

const router = express.Router();
router.get(
    "/announcement",
    authenticate,
    authorizeRole("student"),
    getAllAnnouncement
  );
  

export default router;
