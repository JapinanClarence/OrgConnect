import express from "express";
import {
  academicYearValidationRules,
  validate,
} from "../../middleware/validator.js";
import {
  authenticate,
  authorizeRole,
} from "../../middleware/authMiddleware.js";

import { createAcadYear } from "../../controller/superadmin/academicYearControlller.js";
const router = express.Router();

//create organization routes
router.post(
  "/academicYear",
  authenticate,
  authorizeRole("superadmin"),
  express.json(),
  academicYearValidationRules(),
  validate,
  createAcadYear
);


export default router;