import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  // tagTypes: ["Message"],
  // refetchOnFocus: true,
  // invalidationBehavior: "immediately",
  keepUnusedDataFor: 0,
  tagTypes: [],
  endpoints: () => ({}),
});

export default apiSlice;
