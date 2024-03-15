import asyncHandler from "../middleware/asyncHandler.js";
import Conversation from "../models/conversationModel.js";
const getAllConversations = asyncHandler(async (req, res) => {
  // Assuming req.user contains information about the currently logged-in user
  const loggedInUserId = req.user._id;
  const users = await Conversation.find({ participants: loggedInUserId })
    .select(["_id", "lastMessage"])
    .populate("participants")
    .select(["_id", "lastMessage"]);

  console.log(users[0]);
  res.status(200).json(users);
});

const getConversationIdByUserId = asyncHandler(async (req, res) => {
  console.log(req);
  const loggedInUserId = req.user._id;
  const conversation = await Conversation.findOne({
    participants: { $all: [loggedInUserId, req.params.id] },
  });
  if (!conversation) {
    let createdConversation = await Conversation.create({
      participants: [loggedInUserId, req.params.id],
    });
    res.status(200).json(createdConversation);
  } else {
    res.status(200).json(conversation);
  }
});

export { getAllConversations, getConversationIdByUserId };
