import express from "express";
import { createUser } from "../../controller/admin/userController.js";
import { userValidationRules, validate } from "../../middleware/validator.js";
import { authenticate, authorizeRole } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/user",
  authenticate,
  authorizeRole("superadmin"),
  express.json(),
  userValidationRules(),
  validate,
  createUser
);

export default router;
