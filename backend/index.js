import cors from "cors";
import "socket.io";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler, routeNotFound } from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import connectToDB from "./config/db.js";
import messageRoutes from "./routes/messageRoute.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import { app, server } from "./socket/socket.js";
dotenv.config();

const port = process.env.PORT || 4000;
// const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === "development" ? "http://localhost:5173" : process.env.REACT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
console.log(process.env.REACT_URL);

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api", (req, res) => {
  res.json({ message: "API is working" });
});
app.use(routeNotFound);
app.use(errorHandler);

// app.listen(port, () => console.log("SERVER is running on port", port));
// [...Array(10)].forEach(() => console.log());
server.listen(port, () => console.log("SERVER is running on port", port));
[...Array(10)].forEach(() => console.log());
connectToDB();
