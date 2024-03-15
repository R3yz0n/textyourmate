import express from "express";
import { tokenVerification } from "../middleware/authMiddleware.js";
import {
  getAllConversations,
  getConversationIdByUserId,
} from "../controllers/conversationController.js";

const router = express.Router();

router.route("/").get(tokenVerification, getAllConversations);
router.get("/friend/:id", tokenVerification, getConversationIdByUserId);

export default router;
