import { useParams } from "react-router-dom";
import { useGetAllMessagesQuery } from "../redux/services/message/messageApiSlice";
import MessageInput from "../components/messages/MessageInput";
import Message from "../components/messages/Message";
import { useLayoutEffect, useRef } from "react";

const ChatRoom = () => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const { data } = useGetAllMessagesQuery(id);
  const messages = data?.messages;
  console.log(messages);
  // console.log(data);
  const receiver = data?.participants[1];
  // console.log(receiver);

  useLayoutEffect(() => {
    // Scroll to the last message when messages change
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);
  return (
    <main className="w-full flex flex-col h-full">
      <>
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="label-text ">To:{receiver?.name}</span>
        </div>
        <div className="px-4 flex flex-col overflow-auto relative  h-[80%]">
          {messages?.length > 0 &&
            messages?.map((message: any, index: number) => (
              <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                <Message message={message} />
              </div>
            ))}
        </div>
        <MessageInput receiverId={receiver?._id} conversationId={id} />
      </>
    </main>
  );
};

export default ChatRoom;
