import SearchInput from "./SearchInput";
import Conversations from "./conversation/Conversations";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col relative">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      {/* <LogoutButton /> */}
      <div className="bottom-0 absolute cursor-pointer">Logout</div>
    </div>
  );
};
export default Sidebar;
