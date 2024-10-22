import express from "express";
import { authorizeRole, authenticate } from "../middleware/authMiddleware.js";

import { getEvents } from "../controller/eventController.js";

const router = express.Router();

// router.get(
//   "/organization",
//   authenticate,
//   authorizeRole("student"),
//   (req, res, next) => {
//     if (req.query.my_orgs) {
//       // If the query param `my_org` is present
//       return studentOrgs(req, res, next);
//     } else {
//       // Otherwise, use `getOrg`
//       return getOrg(req, res, next);
//     }
//   }
// );

// router.get(
//   "/organization/:id",
//   authenticate,
//   authorizeRole("student"),
//   findOrg
// );
router.get(
    "/events",
    authenticate,
    authorizeRole("student"),
    getEvents
  );
  

export default router;
