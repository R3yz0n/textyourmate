import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { BASE_URL } from "../../../constants";

// Initial state
const initialState = {
  onlineUsers: [],
};

// Create the auth slice
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getOnlineUsers: (state, { payload }) => {
      const socket = io(BASE_URL, {
        query: {
          userId: payload,
        },
      });
      console.log(state.onlineUsers);
      socket?.on("getOnlineUsers", (onlineUserIds) => {
        console.log(onlineUserIds);
        // state.onlineUsers = onlineUserIds;
        // if (onlineUserIds) state.onlineUsers = [...onlineUserIds];
      });
      state.onlineUsers.push("1");
    },
  },
});

// Export actions and reducer
export const { getOnlineUsers } = notificationSlice.actions;
export default notificationSlice.reducer;
