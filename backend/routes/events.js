import express from "express";
import { authorizeRole, authenticate } from "../middleware/authMiddleware.js";

import { getEvents } from "../controller/eventController.js";

const router = express.Router();
router.get(
    "/events",
    authenticate,
    authorizeRole("student"),
    getEvents
  );
  

export default router;
