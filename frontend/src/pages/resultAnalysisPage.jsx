import React from "react";
import { Link } from "react-router-dom";
import PieChart from "../components/pie chart/chart";
import { useSelector } from "react-redux";

function ResultAnalysisPage() {
  const points = useSelector((state) => state.result).Points;
  const user_fullName = useSelector((state) => state.user).user_fullName;
  return (
    <>
      <nav className="flex justify-between items-center xsm:h-[40px] md:h-16 relative">
        <div className="brand_container flex items-end">
          <div className="font-bold md:text-2xl lg:text-3xl text-blue-500 cursor-pointer">
            <Link to={"/"}>Mercor Oral Exam</Link>
          </div>
        </div>
      </nav>

      <div className="flex mt-[100px]">
        <PieChart />
        <div className="ml-[100px] mt-[70px]">
          <div>
            <span className="text-xl font-medium">Name : </span>
            <span className="text-xl font-medium">{user_fullName}</span>
          </div>
          <div className="mt-[10px]">
            <span className="text-xl font-medium">Result : </span>
            <span className="text-xl font-medium">{points ? points : 0} / 100 </span>
          </div>
          <div className="mt-[30px] text-3xl font-bold text-blue-600">
            It is cool !!!
          </div>

          <Link to={"/"}>
            <div className="flex items-center justify-center bg-white inline-block h-9 text-green-600 w-[200px] font-bold px-7 rounded-lg border-green-600 border-2 my-5 cursor-pointer">
              Home
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ResultAnalysisPage;
