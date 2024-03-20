import asyncHandler from "../middleware/asyncHandler.js";
import Conversation from "../models/conversationModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body.message;
  const senderId = req.user._id;
  const receiverId = req.body.receiverId;
  const conversationId = req.params.id;
  let conversaton = await Conversation.findById(conversationId);

  if (!conversaton) {
    // conversaton = await Conversation.create({ participants: [senderId, receiverId] });
    throw new Error("Conversation not ");
  }

  const newMessage = new Message({ senderId, receiverId, message });
  if (newMessage) {
    conversaton.messages.push(newMessage._id);
    conversaton.lastMessage = message;
    conversaton.totalMessageCount += 1;
    newMessage.conversationId = conversationId;
  }
  console.log(newMessage);

  await Promise.all([newMessage.save(), conversaton.save()]);
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverId) {
    console.log("socket id");
    console.log(receiverSocketId);

    const updatedNewMessage = { ...newMessage._doc, conversationId: conversationId };
    io.to(receiverSocketId).emit("newMessage", updatedNewMessage);
  }
  res.status(201).json(newMessage);
});

const getMessages = asyncHandler(async (req, res) => {
  const conversationId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Count total number of messages for the conversation
  const totalMessagesCount = await Conversation.countDocuments();

  const conversation = await Conversation.findById(conversationId)
    .select(["_id", "lastMessage", "totalMessageCount"])
    .populate({
      path: "messages",
      options: {
        limit: limit,
        skip: (page - 1) * limit,
        sort: { createdAt: -1 },
      },
    })
    .populate({ path: "participants", select: "name email" });

  return res.json(conversation);
});

export { sendMessage, getMessages };
