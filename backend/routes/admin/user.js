import express from "express";
import {
  createUser,
  findUser,
  getUser,
} from "../../controller/admin/userController.js";
import { userValidationRules, validate } from "../../middleware/validator.js";
import {
  authenticate,
  authorizeRole,
} from "../../middleware/authMiddleware.js";

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

router.get("/user", authenticate, authorizeRole("superadmin"), getUser);

router.get("/user/:id", authenticate, authorizeRole("superadmin"), findUser);
export default router;
