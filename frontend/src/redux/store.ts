import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import authSlice from "./services/auth/authSlice";
import userSlice from "./services/user/userSlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
