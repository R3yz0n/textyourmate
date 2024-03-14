import asyncHandler from "../middleware/asyncHandler.js";
import Conversation from "../models/conversationModel.js";
const getAllConversations = asyncHandler(async (req, res) => {
  // Assuming req.user contains information about the currently logged-in user
  const loggedInUserId = req.user._id;
  const users = await Conversation.find({ participants: loggedInUserId })
    .populate("participants", "name")
    .select(["_id", "lastMessage"]);

  res.status(200).json(users);
});

const getConversationIdByUserId = asyncHandler(async (req, res) => {
  console.log("test");
  const loggedInUserId = req.user._id;
  console.log("test");
  const conversation = await Conversation.findOne({
    participants: { $all: [loggedInUserId, req.params.id] },
  });
  console.log(conversation);
});

export { getAllConversations, getConversationIdByUserId };
