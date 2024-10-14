import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";

import {
    deleteMember,
  getMembers,
  updateMember,

} from "../../controller/admin/memberController.js";

const router = express.Router();

router.get("/members", 
    authenticate,
    authorizeRole("admin"),
    getMembers
)
router.patch("/members/:id", 
    authenticate,
    authorizeRole("admin"),
    express.json(),
    updateMember
)
router.delete("/members/:id", 
    authenticate,
    authorizeRole("admin"),
    deleteMember
)

export default router;
