import express from "express";
import { authorizeRole, authenticate } from "../middleware/authMiddleware.js";

// import { getAllEvents, getEvents } from "../controller/eventController.js";
import { getOfficers } from "../controller/officersController.js";

const router = express.Router();
  
  router.get(
    "/organization/:id/officers",
    authenticate,
    authorizeRole("student"),
    getOfficers
  );
  
export default router;
