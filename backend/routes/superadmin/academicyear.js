import express from "express";
import {
  academicYearValidationRules,
  validate,
} from "../../middleware/validator.js";
import {
  authenticate,
  authorizeRole,
} from "../../middleware/authMiddleware.js";

import { createAcadYear, getAcademicYears, updateAcadyear } from "../../controller/superadmin/academicYearControlller.js";
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

router.patch("/academicYear/:id",
  authenticate,
  authorizeRole("superadmin"),
  express.json(),
  updateAcadyear
)


router.get("/academicYear",
  authenticate,
  authorizeRole("superadmin"),
  getAcademicYears
)

export default router;