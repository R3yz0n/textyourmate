import { io } from "socket.io-client";
import { BASE_URL, MESSAGE_URL } from "../../../constants";
import apiSlice from "../apiSlice";

export const messageApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Message"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllMessages: builder.query({
        query: (conversationId) => `${MESSAGE_URL}/${conversationId}`,
        //
        providesTags: ["Message"],
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

      sendMessage: builder.mutation({
        query: ({ conversationId, message, receiverId }) => ({
          url: `${MESSAGE_URL}/${conversationId}`,
          method: "POST",
          body: { message, receiverId },
        }),

        // invalidatesTags: ["Message"],

        async onQueryStarted(task, { dispatch, queryFulfilled }) {
          console.log(task);
          const { data } = await queryFulfilled;
          console.log(data);
          const patchResult = dispatch(
            messageApiSlice.util.updateQueryData("getAllMessages", task.conversationId, (draft) => {
              console.log(JSON.stringify(draft, null, 2));
              draft?.messages?.push(data);
            })
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
            messageApiSlice.util.invalidateTags("Message");
          }
        },
      }),
    }),
  });

export const { useGetAllMessagesQuery, useSendMessageMutation } = messageApiSlice;
