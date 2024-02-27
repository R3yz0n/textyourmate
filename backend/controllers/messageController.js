import asyncHandler from "../middleware/asyncHandler.js";
import Conversation from "../models/conversationModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Message from "../models/messageModel.js";
import { send } from "process";

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

  // socket Io functionality will go there
  await Promise.all([newMessage.save(), conversaton.save()]);
  res.status(201).json({ message: "Message sent." });
});

const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChat } = req.params;
  const senderId = req.user._id;

  // let conversaton = await Conversation.find().populate("messages");
  // console.log(conversaton);

  let conversaton = await Conversation.findOne({
    participants: { $all: [senderId, userToChat] },
  }).populate("messages");

  if (!conversaton) {
    return res.status(200).json([]);
  }

  res.status(200).json({ messages: conversaton.messages });
});

export { sendMessage, getMessages };
