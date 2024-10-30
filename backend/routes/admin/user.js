import express from "express";
import { findUser, updateUser } from "../../controller/admin/userController.js";
import { userValidationRules, validate } from "../../middleware/validator.js";
import {
  authenticate,
  authorizeRole,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/profile",
  authenticate,
  authorizeRole("admin", "superadmin"),
  findUser
);

router.patch(
  "/profile",
  authenticate,
  authorizeRole("admin", "superadmin"),
  express.json(),
  updateUser
);

export default router;
