import express from "express";
import {
  createUser,
  findUser,
  getUser,
  updateUser,
} from "../../controller/superadmin/userController.js";
import { userValidationRules, organizationValidationRules, validate } from "../../middleware/validator.js";
import {
  authenticate,
  authorizeRole,
} from "../../middleware/authMiddleware.js";
import { createOrg, findOrg, updateOrg, uploadBanner } from "../../controller/admin/orgController.js";
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

router.patch("/accounts/:id", authenticate, authorizeRole("superadmin"),express.json(), updateUser);
export default router;
