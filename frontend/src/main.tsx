import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./screens/Login.tsx";
import ChatRoom from "./screens/ChatRoom.tsx";
import Friends from "./screens/Friends.tsx";
import Conversations from "./screens/Conversations.tsx";
import Layout from "./components/Layout.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="" element={<Layout />}>
        <Route path="/" index={true} element={<Conversations />} />
        <Route path="/conversation/:id" element={<ChatRoom />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/*" element={<Navigate to={"/"} replace />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
