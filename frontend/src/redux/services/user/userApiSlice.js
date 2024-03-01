// import { userLoginData, userLoginResponseData } from ".";
import { BASE_URL, MESSAGE_URL, USERS_URL } from "../../../constants";
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

    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useGetAllUsersQuery } = usersApiSlice;
