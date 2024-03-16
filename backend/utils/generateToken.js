import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
  });
};

export default generateToken;
