import { BASE_URL, MESSAGE_URL, USERS_URL } from "../../../constants";
import apiSlice from "../apiSlice";

export const messageApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Message"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserConversation: builder.query({
        query: (userId) => `${MESSAGE_URL}/${userId}`,
        //
        providesTags: ["Message"],
      }),

      sendMessage: builder.mutation({
        query: ({ receiverId, message }) => ({
          url: `${MESSAGE_URL}/${receiverId}`,
          method: "POST",
          body: { ...message },
        }),

        // invalidatesTags: ["Message"],

        async onQueryStarted(task, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            messageApiSlice.util.updateQueryData("getUserConversation", undefined, (draft) => {
              // Consider removing or providing a more informative log message
              console.log("Updated user conversation:", draft);
            })
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }),
    }),
  });

export const { useGetUserConversationQuery, useSendMessageMutation } = messageApiSlice;
