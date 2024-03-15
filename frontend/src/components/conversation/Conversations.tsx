import { useGetAllConversationQuery } from "../../redux/services/conversation/conversationApiSlice";
import SearchInput from "../SearchInput";
import Conversation from "./Conversation";

const Conversations = () => {
  const { data: conversations } = useGetAllConversationQuery(); // Pass the required argument
  // console.log(conversations);
  // console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto h-[65vh] vi px-2">
      {/* <SearchInput /> */}
      {conversations?.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
    </div>
  );
};

export default Conversations;
