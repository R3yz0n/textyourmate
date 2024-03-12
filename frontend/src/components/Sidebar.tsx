import { useDispatch, useSelector } from "react-redux";
import Conversations from "./conversation/Conversations";
import Friends from "./friends/Friends";
import { Link, NavLink } from "react-router-dom";
import useCustomDispatch from "../hooks/dispatch";
import { logout } from "../redux/services/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoChatbox } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className=" border-slate-500   flex justify-evenly absolute bottom-0 left-0 w-full py-2    gap-4 bg-black bg-opacity-15 ">
      <NavLink to="/profile" className={({ isActive }) => (isActive ? "text-cyan-500 " : "")}>
        <FaUserCircle className="text-2xl" />
      </NavLink>

      <NavLink to="/" className={({ isActive }) => (isActive ? "text-cyan-500 " : "")}>
        <p className="items-center flex flex-col text-sm">
          <IoChatbox className="text-2xl" />
        </p>
      </NavLink>

      <NavLink to="/friends" className={({ isActive }) => (isActive ? "text-cyan-500 " : "")}>
        <p className="items-center flex flex-col text-sm">
          {" "}
          <FaUserFriends className="text-2xl" />
        </p>
      </NavLink>

      <button
        className="flex"
        onClick={() => {
          dispatch(logout());
        }}
      >
        <MdLogout className="text-2xl" />
      </button>
    </nav>
  );
};
export default Sidebar;
