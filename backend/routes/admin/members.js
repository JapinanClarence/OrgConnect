import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";

import {
  getMembers,

} from "../../controller/admin/memberController.js";

const router = express.Router();

router.get("/members", 
    authenticate,
    authorizeRole("admin"),
    getMembers
)

export default router;
