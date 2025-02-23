import express from "express";
import {
  findOrg,
  getOrg,
  joinOrg,
  leaveOrg,
  searchOrg,
  studentOrgs,
} from "../controller/organizationController.js";
import { authorizeRole, authenticate } from "../middleware/authMiddleware.js";
import {
  joinOrganizationValidationRules,
  validate,
} from "../middleware/validator.js";

const router = express.Router();

router.get(
  "/organization",
  authenticate,
  authorizeRole("student"),
  (req, res, next) => {
    if (req.query.my_orgs) {
      // If the query param `my_org` is present
      return studentOrgs(req, res, next);
    } else {
      // Otherwise, use `getOrg`
      return getOrg(req, res, next);
    }
  }
);

router.get(
  "/organization/:id",
  authenticate,
  authorizeRole("student"),
  findOrg
);

router.post(
  "/organization",
  authenticate,
  authorizeRole("student"),
  express.json(),
  joinOrganizationValidationRules(),
  validate,
  joinOrg
);
router.delete("/organization/:id", authenticate, authorizeRole("student"), leaveOrg);

router.get("/search", authenticate, authorizeRole("student"), searchOrg)

export default router;
