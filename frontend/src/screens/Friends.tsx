import Friend from "../components/friend/Friend";
import { useGetAllUsersQuery } from "../redux/services/user/userApiSlice";

const Friends = () => {
  const { data: users } = useGetAllUsersQuery(undefined); // Pass the required argument

  // console.log(users);
  return (
    <div className="py-2 flex flex-col overflow-auto max-h-[400px] ">
      {users?.map((user) => (
        <Friend user={user} key={user?._id} />
      ))}
    </div>
  );
};
export default Friends;
