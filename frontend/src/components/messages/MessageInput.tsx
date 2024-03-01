import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserConversationQuery,
  useSendMessageMutation,
} from "../../redux/services/message/messageApiSlice";
const MessageInput = () => {
  const [inputMsg, setInputMsg] = useState("");
  const [sendMessage] = useSendMessageMutation();
  const { selectedConversation: receiverId } = useSelector((state: any) => state.user);
  const { selectedConversation } = useSelector((state: any) => state.user);
  const { data: messages } = useGetUserConversationQuery(selectedConversation);
  const dispatch = useDispatch();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let message = {
        message: inputMsg,
      };

      const data = await sendMessage({ receiverId, message }).unwrap();
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <form className="px-4 my-3" onSubmit={submitHandler}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Type a message"
          onChange={(e) => setInputMsg(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
