import express from "express";
import { getOrg, joinOrg, studentOrgs } from "../controller/organizationController.js";
import { authorizeRole, authenticate } from "../middleware/authMiddleware.js";

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

export default router;
