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
} from "react-router-dom";
import Login from "./screens/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Friends from "./components/friends/Friends.jsx";
import Conversations from "./components/conversation/Conversations.tsx";
import MessageContainer from "./components/messages/MessageContainer.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/conversation/:id" element={<></>} /> */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" index={true} element={<Conversations />} />
        <Route path="/conversation/:id" element={<MessageContainer />} />
        <Route path="/friends" element={<Friends />} />
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
