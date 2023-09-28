import React, { useState } from "react";
import "./navbar.style.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
function Navbar() {
  const [showDropDwon, setShowDropDwon] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <nav className="flex justify-between items-center xsm:h-[40px] md:h-16 relative">
      <div className="brand_container flex items-end">
        <div className="font-bold md:text-2xl lg:text-3xl text-blue-500 cursor-pointer">
          <Link to={"/"}>Mercor Oral Exam</Link>
        </div>
        <div className="xsm:hidden md:block md:text-base md:font-medium cursor-pointer md:mx-6">
          <Link to={"/reading"}>Start Reading</Link>
        </div>
      </div>
      <div className="auth_container text-sm flex items-end font-medium">
        {user.authenticated ? (
          <></>
        ) : (
          <>
            <div className="xsm:hidden md:block cursor-pointer border-solid border-2 py-1 border-blue-500 px-4 mx-[20px] rounded-[10px]">
              <Link to={"/login"}>Login</Link>
            </div>
            <div className="xsm:hidden md:block cursor-pointer px-4 py-1 mx-[20px] rounded-[10px] bg-blue-500 text-white">
              <Link to={"/signup"}>Sign Up</Link>
            </div>
          </>
        )}

        <div className="xsm:block md:hidden">
          <GiHamburgerMenu onClick={() => setShowDropDwon(!showDropDwon)} />
        </div>

        {showDropDwon && (
          <>
            <div className="dropdown">
              <ul>
                <li className=" my-[5px] font-medium h-[30px] text-blue-600">
                  <Link to={"/exam"}>Exam</Link>
                </li>
                <li className=" my-[5px] font-medium h-[30px] text-blue-600">
                  <Link to={"/login"}>Login</Link>
                </li>
                <li className=" my-[5px] font-medium h-[30px]  text-blue-600">
                  <Link to={"/signup"}>Sign Up</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
