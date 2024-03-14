import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="h-[85vh] w-[400px] mx-auto mt-20 border-4 border-zinc-900  rounded-lg items-center justify-center  ">
      <Outlet />
    </div>
  );
};

export default App;

// <div className={darkTheme ? "dark" : ""}>
{
  /* <div className={`form-control ${darkTheme ? "dark" : ""}`}>
        <label className="label cursor-pointer" onClick={toggleTheme}>
          <span className="label-text">Remember me</span>
          <input type="checkbox" className="toggle border" checked={darkTheme} />
        </label>
      </div> */
}

// </div>
