import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "development" ? "http://localhost:5173" : process.env.REACT_URL,

    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
const userSocketMap = {};

io.on("connection", (socket) => {
  // console.log(socket);
  console.log("a user connected.");

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    console.log("a user disconnected.");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server, getReceiverSocketId };
