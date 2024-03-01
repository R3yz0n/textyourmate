import { useRef, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import { useGetUserConversationQuery } from "../../redux/services/message/messageApiSlice";
const Messages = () => {
  const { selectedConversation } = useSelector((state: any) => state.user);
  const { data: messages } = useGetUserConversationQuery(selectedConversation, {
    skip: !selectedConversation,
  });
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Scroll to the last message when messages change
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="px-4 flex flex-col overflow-auto relative">
      {messages?.length > 0 &&
        messages?.map((message: any, index: number) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
