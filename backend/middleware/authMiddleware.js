import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protected routes

const tokenVerification = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  console.log(token);
  if (token) {
    try {
      console.log("---------  ");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log(req.user);

      if (!req.user) {
        res.status(401);
        throw new Error("User not found.");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const adminVerification = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
export { tokenVerification, adminVerification };
