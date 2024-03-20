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
          // console.log(newQueryArgs);
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

          socket.on("newMessage", (message) => {
            console.log(message);
            updateCachedData((draft) => {
              draft?.messages?.push(message);
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
          console.log(conversationId);
          const { data } = await queryFulfilled;
          // console.log(task);
          let page = undefined,
            limit = 10;
          // console.log(data);
          const patchResult = dispatch(
            messageApiSlice.util.updateQueryData(
              "getAllMessages",
              { conversationId, page, limit },
              (draft) => {
                console.log(JSON.stringify(draft, null, 2));
                draft?.messages?.unshift(data);
              }
            )
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
