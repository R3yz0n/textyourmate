import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SearchInput from "./SearchInput";
import Sidebar from "./Sidebar";
import path from "path";

const Home = () => {
  const { pathname } = useLocation();

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

export default Home;
