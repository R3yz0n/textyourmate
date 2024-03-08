import cors from "cors";
import "socket.io";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler, routeNotFound } from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import connectToDB from "./config/db.js";
import messageRoutes from "./routes/messageRoute.js";
import { app, server } from "./socket/socket.js";
dotenv.config();

const port = process.env.PORT || 4000;
// const app = express();

// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/message", messageRoutes);
app.use(routeNotFound);
app.use(errorHandler);

// app.listen(port, () => console.log("SERVER is running on port", port));
// [...Array(10)].forEach(() => console.log());
server.listen(port, () => console.log("SERVER is running on port", port));
[...Array(10)].forEach(() => console.log());
connectToDB();
