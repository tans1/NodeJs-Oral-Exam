import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../../saga/actions/actions";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    if (user?.authenticated) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    }
  }, [user?.authenticated]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password
    };
    dispatch(LoginUser(data));
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label
            className="mt-3 text-base  block font-medium"
            htmlFor="username">
            Username
          </label>
          <input
            className="text-sm border-solid border-2 border-blue-500 outline-none p-1 rounded-md w-52 font-normal"
            type="text"
            placeholder="username"
            name="username"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            className="mt-3 text-base block font-medium"
            htmlFor="password">
            Password
          </label>
          <input
            className="text-sm border-solid border-2 border-blue-500 outline-none p-1 rounded-md w-52 font-normal"
            type="password"
            placeholder="password"
            name="password"
            defaultValue={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            type="submit"
            value="Login"
            className="hover:scale-105 w-52 flex items-center justify-center bg-white inline-block h-9 text-green-600 font-bold px-7 rounded-lg border-green-600 border-2 mt-5 mb-1 cursor-pointer"
          />
        </form>
      </div>
      <div>

        <div>
          already no have an account?{" "}
          <Link to={"/signup"} className="ml-1 text-blue-600 underline">
            Register
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

export default Login;
