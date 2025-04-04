import express from "express";
import {
  authenticate,
  authorizeRole,
} from "./../../middleware/authMiddleware.js";

import {
    deleteMember,
  getApproveMembers,
  getMembers,
  updateMember,

} from "../../controller/admin/memberController.js";

const router = express.Router();

router.get("/members", 
    authenticate,
    authorizeRole("admin", "secretary", "treasurer", "auditor"),
    getMembers
)
router.get("/members/approved", 
  authenticate,
  authorizeRole("admin", "secretary", "treasurer", "auditor"),
  getApproveMembers
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
