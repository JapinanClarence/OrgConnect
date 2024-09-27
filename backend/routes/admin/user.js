import express from "express";
import { createUser } from "../../controller/admin/userController.js";
import { userValidationRules, validate } from "../../middleware/validator.js";

const router = express.Router();

router.post(
  "/user",
  express.json(),
  userValidationRules(),
  validate,
  createUser
);

export default router;
