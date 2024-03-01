import { createSlice } from "@reduxjs/toolkit";

// Define the type for user information
interface UserInfo {
  id: number;
  username: string;
  // Other properties...
}

// Define the state type
interface AuthState {
  userInfo: UserInfo | null;
}

// Initial state
const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

// Export actions and reducer
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
