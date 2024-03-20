import { io } from "socket.io-client";
import { BASE_URL, MESSAGE_URL } from "../../../constants";
import apiSlice from "../apiSlice";

export const messageApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Message"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllMessages: builder.query({
        query: ({ conversationId }) => `${MESSAGE_URL}/${conversationId}`,

        providesTags: ["Message"],
        transformResponse: (response) => {
          return response;
        },

        serializeQueryArgs: ({ queryArgs }) => {
          const newQueryArgs = { ...queryArgs };
          if (newQueryArgs.page) {
            delete newQueryArgs.page;
          }

          return newQueryArgs;
        },
        merge: (oldCache, newCache) => {
          const { messages: newMessages, ...restNewCache } = newCache;
          const { messages: oldMessages, ...restOldCache } = oldCache;
          return {
            ...restNewCache,

            messages: [...oldMessages, ...newMessages], // Merge old and new messages
          };
        },

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
          console.log(socket);

          socket.on("newMessage", (message) => {
            console.log(message);
            updateCachedData((draft) => {
              console.log(JSON.stringify(draft));
              draft?.messages?.unshift(message);
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
          // console.log(task);
          let conversationId = task.conversationId;
          const { data } = await queryFulfilled;
          let page = undefined,
            limit = 10;
          const patchResult = dispatch(
            messageApiSlice.util.updateQueryData(
              "getAllMessages",
              { conversationId, page, limit },
              (draft) => {
                draft?.messages?.unshift(data);
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

export const { useGetAllMessagesQuery, useSendMessageMutation } = messageApiSlice;
