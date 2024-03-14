import { io } from "socket.io-client";
import { BASE_URL, CONVERSATION_URL, MESSAGE_URL } from "../../../constants";
import apiSlice from "../apiSlice";

export const conversationApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Conversation"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserConversation: builder.query({
        query: (receiverId) => `${CONVERSATION_URL}`,
        //
        providesTags: ["Conversation"],
        async onCacheEntryAdded(
          arg,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
        ) {
          // create a WebSocket connection when the cache subscription starts
          const { auth } = getState();
          const socket = io(BASE_URL, {
            query: {
              userId: auth?.userInfo?._id,
            },
          });
          console.log("here");
          socket.on("newMessage", (message) => {
            console.log(message);
            updateCachedData((draft) => {
              draft?.push(message);
            });
          });

          try {
            await cacheDataLoaded;
          } catch (err) {
            console.log(err);
          }

          await cacheEntryRemoved;
          socket.close();
        },
      }),
    }),
  });

export const { useGetUserConversationQuery } = conversationApiSlice;
