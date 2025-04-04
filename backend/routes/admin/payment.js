import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";
import {
  validate,
  announcementValidationRules,
  paymentValidationRules,
  recordPaymentValidationRules,
} from "../../middleware/validator.js";
import {
  createPayment,
  deletePayment,
  deleteUserPayment,
  editPaymentRecord,
  findPayment,
  getPayment,
  recordPayment,
  updatePayment,
} from "../../controller/admin/paymentController.js";

const router = express.Router();

//create organization routes
router.post(
  "/payment",
  authenticate,
  authorizeRole("admin", "treasurer", "auditor"),
  express.json(),
  paymentValidationRules(),
  validate,
  createPayment
);

router.patch(
  "/payment/:id",
  authenticate,
  authorizeRole("admin", "treasurer", "auditor"),
  express.json(),
  updatePayment
);

router.delete(
  "/payment/:id",
  authenticate,
  authorizeRole("admin", "treasurer", "auditor"),
  deletePayment
);
router.patch(
  "/payment/:id/recordPayment",
  authenticate,
  authorizeRole("admin", "treasurer"),
  express.json(),
  recordPaymentValidationRules(),
  recordPayment
);

router.delete(
  "/payment/:paymentId/member/:memberId",
  authenticate,
  authorizeRole("admin", "treasurer"),
  deleteUserPayment
);

router.patch(
  "/payment/:paymentId/member/:memberId",
  authenticate,
  authorizeRole("admin", "treasurer"),
  express.json(),
  editPaymentRecord
);

router.get(
  "/payment",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getPayment
);

router.get(
  "/payment/:id",
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  findPayment
);

export default router;
