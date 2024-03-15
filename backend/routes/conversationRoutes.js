import express from "express";
import { tokenVerification } from "../middleware/authMiddleware.js";
import {
  getAllConversations,
  getConversationById,
  getConversationIdByUserId,
} from "../controllers/conversationController.js";

const router = express.Router();

router.route("/").get(tokenVerification, getAllConversations);

router
  .route("/:id")
  .get(tokenVerification, getConversationById)
  .post(tokenVerification, getConversationIdByUserId);

export default router;
