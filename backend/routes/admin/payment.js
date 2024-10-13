import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";
import {
  validate,
  announcementValidationRules,
  paymentValidationRules,
} from "../../middleware/validator.js";
import {
  createPayment,
  deletePayment,
  getPayment,
  updatePayment,
  //   getAttendance,
  //   updateAttendance,
} from "../../controller/admin/paymentController.js";

const router = express.Router();

//create organization routes
router.post(
  "/payment",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  paymentValidationRules(),
  validate,
  createPayment
);

router.patch(
  "/payment/:id",
  authenticate,
  authorizeRole("admin"),
  express.json(),
  updatePayment
);

router.delete(
    "/payment/:id",
    authenticate,
    authorizeRole("admin"),
    deletePayment
  );

router.get("/payment", authenticate, authorizeRole("admin"), getPayment);

// router.get(
//     "/announcement/:id",
//     authenticate,
//     authorizeRole("admin"),
//     findAnnouncement
//   );

export default router;
