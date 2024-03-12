import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchInput from "./SearchInput";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  if (userInfo)
    return (
      <section className="flex flex-col relative h-full">
        <div className="pt-4">
          <SearchInput />
          <Outlet />
        </div>
        <Sidebar />
      </section>
    );
  return <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
