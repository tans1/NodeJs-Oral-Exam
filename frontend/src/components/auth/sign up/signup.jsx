import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RegisterUser } from "../../../saga/actions/actions";

function SignUpComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
   
  useEffect(()=>{
    if (user?.registered) {
      navigate("/login");
    }
  },[user?.registered])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("passwords do not match");
      return;
    }
    const data = {
      username: username,
      email: email,
      fullName: fullName,
      password: password
    };
    dispatch(RegisterUser(data));
    
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
          <label className="mt-3 text-base  block font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="text-sm border-solid border-2 border-blue-500 outline-none p-1 rounded-md w-52 font-normal"
            type="email"
            placeholder="email"
            name="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mt-3 text-base block font-medium" htmlFor="name">
            Full Name
          </label>
          <input
            className="text-sm border-solid border-2 border-blue-500 outline-none p-1 rounded-md w-52 font-normal "
            type="text"
            placeholder="full name"
            name="name"
            defaultValue={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
          <label
            className="mt-3 text-base block font-medium"
            htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="text-sm border-solid border-2 border-blue-500 outline-none p-1 rounded-md w-52 font-normal"
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            defaultValue={password2}
            onChange={(e) => setpassword2(e.target.value)}
          />
          <input
            type="submit"
            value="Register"
            className="hover:scale-105 w-52 flex items-center justify-center bg-white inline-block h-9 text-green-600 font-bold px-7 rounded-lg border-green-600 border-2 mt-5 mb-1 cursor-pointer"
          />
        </form>
      </div>
      <div>

        <div>
          already have an account?{" "}
          <Link to={"/login"} className="ml-1 text-blue-600 underline">
            Login
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

export default SignUpComponent;
