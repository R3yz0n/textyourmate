import { io } from "socket.io-client";
import { BASE_URL, MESSAGE_URL } from "../../../constants";
import apiSlice from "../apiSlice";

export const messageApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Message"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllMessages: builder.query({
        query: ({ conversationId, page, limit }) =>
          `${MESSAGE_URL}/${conversationId}?page=${page}&limit=${limit}`,

        providesTags: ["Message"],
        // transformResponse: (response) => {
        //   return response;
        // },

        serializeQueryArgs: ({ queryArgs }) => {
          const newQueryArgs = { ...queryArgs };
          if (newQueryArgs.page) {
            delete newQueryArgs.page;
          }
          return newQueryArgs;
        },
        merge: (oldCache, newCache) => {
          // console.log(JSON.stringify(oldCache, null, 2));
          // console.log(newCache);
          const { messages, ...rest } = oldCache;
          console.log(JSON.stringify(rest, null, 2));
          return {
            ...newCache.participants,
            // ...rest,
            messages: [...newCache.messages, ...oldCache.messages],
            // ...oldCache,
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
          const { data } = await queryFulfilled;
          console.log(data);
          const patchResult = dispatch(
            messageApiSlice.util.updateQueryData("getAllMessages", task.conversationId, (draft) => {
              // console.log(JSON.stringify(draft, null, 2));
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
