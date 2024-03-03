import { MESSAGE_URL } from "../../../constants";
import apiSlice from "../apiSlice";

export const messageApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Message"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserConversation: builder.query({
        query: (receiverId) => `${MESSAGE_URL}/${receiverId}`,
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
