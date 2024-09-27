import express from "express";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";
import { findUser } from "../controller/userController.js";

const router = express.Router();

router.get("/", authenticate, authorizeRole("student"), findUser);


export default router;