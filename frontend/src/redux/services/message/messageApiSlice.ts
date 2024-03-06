import { io } from "socket.io-client";
import { BASE_URL, MESSAGE_URL } from "../../../constants";
import apiSlice from "../apiSlice";

export const messageApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Message"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserConversation: builder.query({
        query: (receiverId) => `${MESSAGE_URL}/${receiverId}`,
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

      sendMessage: builder.mutation({
        query: ({ receiverId, message }) => ({
          url: `${MESSAGE_URL}/${receiverId}`,
          method: "POST",
          body: { ...message },
        }),

        // invalidatesTags: ["Message"],

        async onQueryStarted(task, { dispatch, queryFulfilled }) {
          console.log(task);
          const { data } = await queryFulfilled;
          console.log(data);
          const patchResult = dispatch(
            messageApiSlice.util.updateQueryData(
              "getUserConversation",
              task.receiverId,
              (draft) => {
                draft?.push(data);
              }
            )
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
            // messageApiSlice.util.invalidateTags("Message");
          }
        },
      }),
    }),
  });

export const { useGetUserConversationQuery, useSendMessageMutation } = messageApiSlice;
