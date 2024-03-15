import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchInput from "./SearchInput";

const ProtectedRoute = (props) => {
  const { userInfo } = useSelector((state: any) => state.auth);

  if (userInfo) return <>{props.children}</>;
  return <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
