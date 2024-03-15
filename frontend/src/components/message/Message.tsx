import { useSelector } from "react-redux";

interface MessageProps {
  message: {
    message: string;
    senderId: string;
    createdAt: string;
  };
}
const Message: React.FC<MessageProps> = ({ message }) => {
  const { userInfo } = useSelector((state: any) => state.auth);
  // console.log(userInfo);
  const fromMe = message?.senderId === userInfo._id;

  return (
    <section className={`chat ${fromMe ? "chat-end" : "chat-start"}`}>
      <div className="chat chat-start w-auto">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className={`chat-bubble ${!fromMe && "bg-blue-500 text-white"}`}>
          {message.message}
        </div>
        <p className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formatTimeFromISOString(message?.createdAt)}
        </p>
      </div>
    </section>
  );
};

export default Message;

function formatTimeFromISOString(isoDateString: string) {
  const date = new Date(isoDateString);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Add leading zero if needed
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${formattedHours}:${formattedMinutes}`;
}
