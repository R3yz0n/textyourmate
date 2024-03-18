import { Link, useParams } from "react-router-dom";
import { useGetAllMessagesQuery } from "../redux/services/message/messageApiSlice";
import MessageInput from "../components/message/MessageInput";
import Message from "../components/message/Message";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ChatRoom = () => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { id: conversationId } = useParams();
  const [page, setPage] = useState(1);
  let limit = 10;
  const { data } = useGetAllMessagesQuery(
    { conversationId, page, limit },
    { refetchOnMountOrArgChange: true }
  );
  const messages = data?.messages;
  // console.log(data);
  const receiver = data?.participants && data?.participants[1];
  // console.log(data);
  const handleNextPage = () => {
    console.log(1);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {}, []);
  useLayoutEffect(() => {
    // Scroll to the last message when messages change
    if (lastMessageRef.current) {
      // lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);
  return (
    <main className="w-full flex flex-col h-full">
      <div className="bg-slate-500 px-4 py-2 mb-2">
        <Link to="/" className="btn  w-12 py-0">
          Back
        </Link>

        <span className="label-text ">{receiver?.name}</span>
      </div>
      <div>h</div>

      <div
        className="px-4 pt-10 flex flex-col-reverse overflow-y-auto relative  h-[80%] b"
        id="scrollableDiv"
      >
        <InfiniteScroll
          className=" overflow-scroll"
          next={() => {
            console.log(1);
            handleNextPage();
          }}
          inverse={true} //
          hasMore={true}
          // loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          dataLength={data?.totalMessageCount || 0}
          initialScrollY={100}
          endMessage={<b className="b">Yay! You have seen it all</b>}
        >
          {messages?.length > 0 &&
            messages?.map((message: any, index: number) => (
              <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                {index}
                <Message message={message} />
              </div>
            ))}
        </InfiniteScroll>
      </div>
      <MessageInput receiverId={receiver?._id} conversationId={conversationId} />
    </main>
  );
};

export default ChatRoom;
