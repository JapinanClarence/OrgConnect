import express from "express";
import { findUser, updateUser, uploadPicture } from "../../controller/admin/userController.js";
import { userValidationRules, validate } from "../../middleware/validator.js";
import {
  authenticate,
  authorizeRole,
} from "../../middleware/authMiddleware.js";
import upload from "../../middleware/multerConfig.js";

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

router.patch(
  "/profile/profilePicture",
  upload.single("profilePicture"),
  authenticate,
  authorizeRole("admin", "superadmin"),
  uploadPicture
);

export default router;
