import express from "express";
import { authorizeRole, authenticate } from "../middleware/authMiddleware.js";

// import { getAllEvents, getEvents } from "../controller/eventController.js";
import { getPayments } from "../controller/paymentController.js";

const router = express.Router();
// router.get(
//     "/events",
//     authenticate,
//     authorizeRole("student"),
//     getAllEvents
//   );
  
  router.get(
    "/organization/:id/payments",
    authenticate,
    authorizeRole("student"),
    getPayments
  );
  
export default router;
