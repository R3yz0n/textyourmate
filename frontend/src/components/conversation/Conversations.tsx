import { useGetUserConversationQuery } from "../../redux/services/conversation/conversationApiSlice";
import SearchInput from "../SearchInput";
import Conversation from "./Conversation";

const Conversations = () => {
  const { data: users } = useGetUserConversationQuery(); // Pass the required argument
  console.log(users);
  // console.log(users);
  return (
    <div className="py-2 flex flex-col overflow-auto h-[65vh] vi px-2">
      {/* <SearchInput /> */}
      {users?.map((user: { _id: number; name: string }) => (
        <Conversation key={user._id} id={user?._id} name={user?.participants?.name} />
      ))}
    </div>
  );
};

export default Conversations;
