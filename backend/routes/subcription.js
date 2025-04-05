import express from "express";
import { authenticate, authorizeRole } from "../middleware/authMiddleware.js";
import { createSubscription } from "../controller/subscriptionController.js";

const router = express.Router();

router.post(
  "/subscribe",
  authenticate,
  authorizeRole("student"),
  express.json(),
  createSubscription
);

export default router;
