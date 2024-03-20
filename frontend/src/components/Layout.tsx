import React, { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import SearchInput from "./SearchInput";
import Sidebar from "./Sidebar";
import ProtectedRoute from "../helpers/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getOnlineUsers } from "../redux/services/notification/notificationSlice";

const Layout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  useLayoutEffect(() => {
    if (userInfo?._id) dispatch(getOnlineUsers(userInfo?._id));
  }, [dispatch]);

  if (pathname.includes("conversation")) {
    return (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    );
  }
  return (
    <ProtectedRoute>
      <section className="flex flex-col relative h-full">
        <div className="pt-4">
          <SearchInput />
          <Outlet />
        </div>
        <Sidebar />
      </section>
    </ProtectedRoute>
  );
};

export default Layout;
