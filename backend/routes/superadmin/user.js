import express from "express";
import {
  createUser,
  findUser,
  getUser,
} from "../../controller/superadmin/userController.js";
import { userValidationRules, validate } from "../../middleware/validator.js";
import {
  authenticate,
  authorizeRole,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/accounts",
  authenticate,
  authorizeRole("superadmin"),
  express.json(),
  userValidationRules(),
  validate,
  createUser
);

router.get("/accounts", authenticate, authorizeRole("superadmin"), getUser);

router.get("/accounts/:id", authenticate, authorizeRole("superadmin"), findUser);
export default router;
