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
  getPayment,
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

// router.patch(
//   "/announcement/:id",
//   authenticate,
//   authorizeRole("admin"),
//   express.json(),
//   updateAnnouncement
// );

// router.delete(
//     "/announcement/:id",
//     authenticate,
//     authorizeRole("admin"),
//     deleteAnnoucement
//   );

router.get("/payment", authenticate, authorizeRole("admin"), getPayment);

// router.get(
//     "/announcement/:id",
//     authenticate,
//     authorizeRole("admin"),
//     findAnnouncement
//   );

export default router;
