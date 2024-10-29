import express from "express";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";
import {
  findUser,
  updateUser,
  uploadPicture,
} from "../controller/userController.js";
import upload from "../middleware/multerConfig.js";
const router = express.Router();

router.get("/", authenticate, authorizeRole("student"), findUser);
router.patch(
  "/",
  express.json(),
  authenticate,
  authorizeRole("student"),
  updateUser
);


router.patch(
  "/profilePicture",
  upload.single("profilePicture"),
  authenticate,
  authorizeRole("student"),
  uploadPicture
);
export default router;
