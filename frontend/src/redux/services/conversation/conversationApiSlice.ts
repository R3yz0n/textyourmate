import { io } from "socket.io-client";
import { BASE_URL, CONVERSATION_URL, MESSAGE_URL } from "../../../constants";
import apiSlice from "../apiSlice";

export const conversationApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Conversation"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getConversationById: builder.query({
        query: (conversationId) => `${CONVERSATION_URL}/${conversationId}`,
        keepUnusedDataFor: 5,
        //
        providesTags: ["Conversation"],
        async onCacheEntryAdded(
          arg,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
        ) {
          console.log(1);
          // create a WebSocket connection when the cache subscription starts
          const { auth } = getState();
          const socket = io(BASE_URL, {
            query: {
              userId: auth?.userInfo?._id,
            },
          });

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
      getAllConversation: builder.query({
        query: (conversationId) => `${CONVERSATION_URL}`,
        async onCacheEntryAdded(
          arg,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
        ) {
          const { auth } = getState();

          const socket = io(BASE_URL, {
            query: {
              userId: auth?.userInfo?._id,
            },
          });

          socket.on("newMessage", (message) => {
            console.log(message);
            updateCachedData((draft) => {
              const convesationToUpdate = draft?.find(
                (convo: any) => convo?._id === message?.conversationId
              );
              convesationToUpdate.lastMessage = message.message;
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

        providesTags: ["Conversation"],
      }),
    }),
  });

export const { useGetConversationByIdQuery, useGetAllConversationQuery } = conversationApiSlice;
