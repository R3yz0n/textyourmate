import asyncHandler from "../middleware/asyncHandler.js";
import Conversation from "../models/conversationModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Message from "../models/messageModel.js";
import { send } from "process";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const senderId = req.user._id;
  const { id: receiverId } = req.params;
  let conversaton = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
  if (!conversaton) {
    conversaton = await Conversation.create({ participants: [senderId, receiverId] });
  } else {
    conversaton = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
  }

  const newMessage = new Message({ senderId, receiverId, message });
  if (newMessage) {
    conversaton.messages.push(newMessage._id);
  }

  await Promise.all([newMessage.save(), conversaton.save()]);
  // socket Io functionality will go there
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverId) {
    console.log(receiverSocketId);

    io.to(receiverSocketId).emit("newMessage", newMessage);
  }
  res.status(201).json(newMessage);
});

const getMessages = asyncHandler(async (req, res) => {
  let conversationId = req.params.id;
  let a = await Conversation.findById(conversationId)
    .select(["messages", "participants"])
    .populate(["participants"]);
  return res.json(a);
  const conversation = await Conversation.findById(conversationId).populate({
    path: "participants",
    select: "name email", // Select the fields you want to populate
  });

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found" });
  }

  // Retrieve all messages associated with the conversation
  const messages = await Message.find({ conversationId: req.params.id }).populate(
    "sender",
    "name email"
  ); // Assuming each message has a sender field referencing the User model

  res.status(200).json({ conversation, messages });
});

export { sendMessage, getMessages };
