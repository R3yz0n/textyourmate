import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../redux/services/user/userApiSlice";
import Conversation from "../conversation/Conversation";

const Friends = () => {
  const { data: users } = useGetAllUsersQuery(undefined); // Pass the required argument
  console.log(users);
  return (
    <div className="py-2 flex flex-col overflow-auto max-h-[400px] ">
      {users?.map((user: { _id: number; name: string }) => (
        <Link>
          <div
            className={`flex gap-2 items-center rounded-md p-2 py-1 cursor-pointer 
          
      `}
            onClick={() => dispatch(selectConversation(id))}
          >
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img
                  className="max-w-full max-h-full overflow-hidden"
                  src="https://firebasestorage.googleapis.com/v0/b/orbit-3eeec.appspot.com/o/gallery%2FBiology%20Lab%201.jpg?alt=media&token=93eee88b-4d48-4acc-87f2-6350c1eb65ea"
                  alt="user avatar"
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 my-2">
              <div>
                <p>{user.name}</p>
                {/* <span>1</span> */}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Friends;
