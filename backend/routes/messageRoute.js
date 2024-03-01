import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { tokenVerification } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:id").get(tokenVerification, getMessages).post(tokenVerification, sendMessage);
export default router;
