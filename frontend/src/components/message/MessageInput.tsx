import React, { useState, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useSendMessageMutation } from "../../redux/services/message/messageApiSlice";

// Import your audio file
import messageSound from "./sendMessageAudio.wav";

const MessageInput = ({ receiverId, conversationId }) => {
  const [inputMsg, setInputMsg] = useState("");
  const [sendMessage] = useSendMessageMutation();
  const selectedConversation = useSelector((state) => state.user.selectedConversation);
  const dispatch = useDispatch();

  // Audio state
  const [audio] = useState(new Audio(messageSound));

  // Function to play audio
  const playAudio = () => {
    audio.currentTime = 0; // Reset audio to start
    audio.play();
  };

  useEffect(() => {
    // Clean up audio when component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let message = {
        message: inputMsg,
      };

      if (!receiverId && selectedConversation) {
        receiverId = selectedConversation.receiverId;
      }

      const data = await sendMessage({ receiverId, message, conversationId }).unwrap();

      playAudio();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="px-4 my-3 absolute bottom-0 right-0 w-full" onSubmit={submitHandler}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Type a message"
          value={inputMsg}
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
