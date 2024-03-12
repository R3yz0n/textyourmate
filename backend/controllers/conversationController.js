import asyncHandler from "../middleware/asyncHandler.js";
import Conversation from "../models/conversationModel.js";
const getAllConversations = asyncHandler(async (req, res) => {
  // Assuming req.user contains information about the currently logged-in user
  const loggedInUserId = req.user._id;
  const users = await Conversation.find().select(["_id", "lastMessage"]);

  res.status(200).json(users);
});
export { getAllConversations };
