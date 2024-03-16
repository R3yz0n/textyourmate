import express from "express";
import { getAllUsers, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { adminVerification, tokenVerification } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.route("/").post(registerUser);
router.post("/logout", logoutUser);
router.post("/login", loginUser).get("/", tokenVerification, getAllUsers);
// router.route("/profile").get(tokenVerification, getUserProfile).put(updateUserProfile);
// router.route("/:id").get(getUserById).put(tokenVerification, adminVerification, updateUser);

export default router;
