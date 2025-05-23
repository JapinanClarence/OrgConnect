import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";
import { validate, eventValidationRules } from "../../middleware/validator.js";
import {
  createEvent,
  deleteEvent,
  findEvent,
  getEvent,
  updateEvent,
} from "../../controller/admin/eventController.js";

const router = express.Router();

//create organization routes
router.post(
  "/event",
  authenticate,
  authorizeRole("admin", "secretary"),
  express.json(),
  eventValidationRules(),
  validate,
  createEvent
);

router.get(
  "/event",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getEvent
);
router.get(
  "/event/:id",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  findEvent
);
router.patch(
  "/event/:id",
  authenticate,
  authorizeRole("admin", "secretary"),
  express.json(),
  updateEvent
);
router.delete(
  "/event/:id",
  authenticate,
  authorizeRole("admin", "secretary"),
  deleteEvent
);

export default router;
