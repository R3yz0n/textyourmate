import { Link, useParams } from "react-router-dom";
import { useGetAllMessagesQuery } from "../redux/services/message/messageApiSlice";
import MessageInput from "../components/message/MessageInput";
import Message from "../components/message/Message";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { skip } from "node:test";
import { useSelector } from "react-redux";

const ChatRoom = () => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { id: conversationId } = useParams();
  const {
    userInfo: { _id: userId },
  } = useSelector((state: any) => state.auth);
  const [page, setPage] = useState(1);
  let limit = 10;
  const { data } = useGetAllMessagesQuery(
    { conversationId, page, limit },
    { refetchOnMountOrArgChange: true }
  );
  const messages = data?.messages;
  // const receiver = data?.participants && data?.participants[1];
  const receiver = data?.participants.find((participant: any) => participant._id !== userId);
  // console.log(receiverDetails);
  // console.log(receiver);
  console.log(messages);

  const handleNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, [setPage]);
  return (
    <main className="w-full flex flex-col h-full">
      <div className="bg-slate-500 px-4 py-2 mb-2">
        <Link to="/" className="btn  w-12 py-0">
          Back
        </Link>

        <span className="label-text ">{receiver?.name}</span>
      </div>
      <section
        className="px-4 pt-10 flex flex-col-reverse overflow-y-auto relative   h-[80%] "
        id="scrollableDiv"
      >
        <InfiniteScroll
          className=" overflow-scroll flex flex-col-reverse"
          next={() => handleNextPage()}
          inverse={true} //
          hasMore={data?.totalMessageCount > messages?.length}
          loader={<h4>Loading...</h4>}
          // loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          dataLength={data?.messages.length || 100}
          // initialScrollY={100}
          scrollThreshold={0.8}
          // endMessage={<b className="b">Yay! You have seen it all</b>}
        >
          {messages?.length > 0 &&
            messages?.map((message: any, index: number) => (
              <Message key={index} message={message} />
            ))}
        </InfiniteScroll>
      </section>
      <MessageInput receiverId={receiver?._id} conversationId={conversationId} />
    </main>
  );
};

export default ChatRoom;
