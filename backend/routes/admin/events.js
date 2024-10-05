import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";
import {
  validate,
  eventValidationRules,
} from "../../middleware/validator.js";
import { createEvent, getEvent } from "../../controller/admin/eventController.js";

const router = express.Router();

//create organization routes
router.post(
  "/event",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  eventValidationRules(),
  validate,
  createEvent
);

router.get("/event",
  authenticate,
  authorizeRole("admin"),
  getEvent
)

export default router;