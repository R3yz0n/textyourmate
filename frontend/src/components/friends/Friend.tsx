import axios from "axios";
import { BASE_URL, CONVERSATION_URL } from "../../constants";

const Friend = ({ user }) => {
  const getConversation = async () => {
    try {
      console.log("here");
      const res = await axios.get(`${BASE_URL}/api/conversation/${user._id}`, {
        withCredentials: true,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      // console.log(user?._id);
    }
  };
  return (
    <div
      className={`flex gap-2 items-center rounded-md p-2 py-1 cursor-pointer 
    
`}
      // onClick={() => dispatch(selectConversation(id))}
      onClick={() => getConversation()}
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
        </div>
      </div>
    </div>
  );
};

export default Friend;
