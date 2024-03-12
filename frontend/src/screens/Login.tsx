// src/components/Login.js
import { useEffect, useState } from "react";
import { useLoginMutation } from "../redux/services/user/userApiSlice";
import { setCredentials } from "../redux/services/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error: any) {
      toast.error(error.data?.message || error.message || "An error occurred. Please try again.");
      console.log(error.data?.message || error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button className="btn btn-active btn-neutral" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
