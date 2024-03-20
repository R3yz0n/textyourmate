import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./services/auth/authSlice";
import userSlice from "./services/user/userSlice";
import apiSlice from "./services/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import notificationSlice from "./services/notification/notificationSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    user: userSlice,
    notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// store.dispatch()
setupListeners(store.dispatch);

export default store;
