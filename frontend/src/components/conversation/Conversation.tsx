import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "../../redux/services/user/userSlice";
import { Link } from "react-router-dom";

interface ConversationProps {
  conversation: {};
  id: number;
}

const Conversation: React.FC<ConversationProps> = ({ conversation, id }) => {
  const { selectedConversation } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  const isSelected = selectedConversation === id;

  return (
    <Link to={`/conversation/${conversation?._id}`}>
      <div
        className={`flex gap-2  items-center rounded-md p-2 py-1 my-1 bg-[rgb(38,38,38)] cursor-pointer ${
          isSelected ? "bg-sky-500" : "hover:bg-sky-500"
        }`}
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
            <p>{conversation && conversation?.participants[1]?.name}</p>
            <span className="text-xs text-gray-400">{conversation?.lastMessage}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Conversation;
