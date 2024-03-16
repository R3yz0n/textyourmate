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

        socket.on("getOnlineUsers", (onlineUserIds) => {
          // Map the received data if needed
          // console.log(onlineUserIds);
          // const updatedUsers =
          //   cacheDataLoaded?.length >= 0 &&
          //   cacheDataLoaded?.map((user) => ({
          //     ...user,
          //     onlineUser: onlineUserIds.includes(user._id),
          //   }));
          // // console.log("Updated Users with Online Status:", updatedUsers);
          // console.log(updatedUsers);
          // // Update the cached data with modified online users
          // updateCachedData(updatedUsers);
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

export const { useLoginMutation, useGetAllUsersQuery, useLogoutMutation } = usersApiSlice;
