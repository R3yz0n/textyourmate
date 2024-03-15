import React from "react";
import { useParams } from "react-router-dom";
import { useGetConversationByIdQuery } from "../redux/services/conversation/conversationApiSlice";
import { useGetAllMessagesQuery } from "../redux/services/message/messageApiSlice";

const ChatRoom = () => {
  const { id } = useParams();
  const { data: messages } = useGetAllMessagesQuery(id);
  console.log(messages);
  return <div>ChatRoom</div>;
};

export default ChatRoom;
