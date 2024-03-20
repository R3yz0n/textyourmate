import { io } from "socket.io-client";
import { BASE_URL, USERS_URL } from "../../../constants";
import apiSlice from "../apiSlice";

export const usersApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: "User" }).injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: {},
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
      providesTags: ["User"],
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

        // socket.on("getOnlineUsers", (onlineUserIds) => {
        //   // console.log(onlineUserIds);
        //   updateCachedData((draft) => {
        //     console.log(JSON.stringify(draft, null, 2));
        //     draft?.map((user) => {
        //       // user.isOnline = onlineUserIds.includes(user.id);
        //       // console.log(JSON.stringify(user, null, 2));
        //       user.isOnline = true;
        //     });
        //   });
        // });

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

export const { useLoginMutation, useGetAllUsersQuery, useLogoutMutation } = usersApiSlice;
