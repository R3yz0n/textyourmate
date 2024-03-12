import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: null,
  isFriendSelected: true,
};

const userSlice = createSlice({
  name: "xd",
  initialState,
  reducers: {
    selectConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
});

export const { selectConversation } = userSlice.actions;
export default userSlice.reducer;
