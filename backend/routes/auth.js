import express from "express";
import { register } from "../controller/authController.js";
import { studentValidationRules, validate } from "../middleware/validator.js";

const router = express.Router();

router.post(
  "/register",
  express.json(),
  studentValidationRules(),
  validate,
  register
);

export default router;
