import cors from "cors";
import "socket.io";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(port, () => console.log("SERVER is running on port", port));
[...Array(10)].forEach(() => console.log());

// const io = new SocketIOServer(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // Socket.IO connection handling
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Handle messages from clients
//   socket.on("message", (message) => {
//     console.log(`Received message: ${message}`);

//     // Broadcast the message to all clients
//     io.emit("message", message);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });
