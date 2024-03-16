import { toast } from "react-toastify";
import Conversation from "../components/conversation/Conversation";
import { useGetAllConversationQuery } from "../redux/services/conversation/conversationApiSlice";

const Conversations = () => {
  const { data: conversations, error } = useGetAllConversationQuery(); // Pass the required argument
  console.log(error);

  // console.log(conversations);
  // console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto h-[65vh] px-2 ">
      {error && (error?.data?.message || error?.message || "An error occurred. Please try again.")}
      {/* <SearchInput /> */}
      {conversations?.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
    </div>
  );
};

export default Conversations;
