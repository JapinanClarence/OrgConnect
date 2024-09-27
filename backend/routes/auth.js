import express from "express";
import { login, register } from "../controller/authController.js";
import { studentValidationRules, validate } from "../middleware/validator.js";

const router = express.Router();

router.post(
  "/register",
  express.json(),
  studentValidationRules(),
  validate,
  register
);

router.post("/login", express.json(), login);

export default router;
