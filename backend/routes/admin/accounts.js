import express from "express";
import {
  authenticate,
  authorizeRole,
} from "../../middleware/authMiddleware.js";
import {
  getAccounts,
  createAccount,
} from "../../controller/admin/accountsController.js";

const router = express.Router();

router.get(
  "/accounts",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getAccounts
);
router.post(
  "/accounts",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  createAccount
);

export default router;
