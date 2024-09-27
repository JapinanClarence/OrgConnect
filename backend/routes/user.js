import express from "express";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";
import { findUser, updateUser } from "../controller/userController.js";

const router = express.Router();

router.get("/", authenticate, authorizeRole("student"), findUser);
router.patch(
  "/",
  express.json(),
  authenticate,
  authorizeRole("student"),
  updateUser
);

export default router;
