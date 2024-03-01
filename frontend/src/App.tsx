import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

const App = () => {
  // const [darkTheme, setDarkTheme] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  // const toggleTheme = () => {
  //   setDarkTheme(!darkTheme);
  // };
  const { userInfo } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (userInfo) {
      const socket = io(BASE_URL, {
        query: {
          userId: userInfo._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users: any) => {
        // console.log(users);
      });
      return () => {
        socket.close();
        setSocket(null);
      };
    }
  }, [userInfo]);

  useEffect(() => {
    // Replace 'http://localhost:5000' with the URL of your Socket.io server
    const socket = io("http://localhost:8000");

    // Listen for 'newMessage' events from the server
    socket.on("newMessage", (message) => {
      console.log(message);
      // Handle the incoming message, for example, by updating the state
      // setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup: Close the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);
  return <Outlet />;
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
