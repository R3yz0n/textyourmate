import { useGetAllUsersQuery } from "../../redux/services/user/userApiSlice";
import Conversation from "./Conversation";

const Conversations = () => {
  const { data: users } = useGetAllUsersQuery(undefined); // Pass the required argument
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {users?.map((user: { _id: number; name: string }) => (
        <Conversation key={user._id} id={user?._id} name={user?.name} />
      ))}
    </div>
  );
};

export default Conversations;
