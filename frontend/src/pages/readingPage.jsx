import React,{useEffect} from "react";
import Reading from "../components/reading/reading";
import { useDispatch } from "react-redux";
import { CreateQuestions } from "../saga/actions/actions";
import { Link } from 'react-router-dom';

function ReadingPage() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(CreateQuestions());
  },[])

  return (
    <>
      <nav className="flex justify-between items-center xsm:h-[40px] md:h-16 relative">
        <div className="brand_container flex items-end">
          <div className="font-bold md:text-2xl lg:text-3xl text-blue-500 cursor-pointer">
            <Link to={"/"}>Mercor Oral Exam</Link>
          </div>
        </div>
        <div className="auth_container text-sm flex items-end font-medium">
          <div className="xsm:hidden md:block cursor-pointer border-solid border-2 py-1 border-blue-500 px-4 mx-[20px] rounded-[10px]">
            <Link to={"/exam"}>Begin The Exam</Link>
          </div>
        </div>
      </nav>
      <div>
        <Reading />
        <div>
          <div className="my-14 flex justify-center items-center">
            <div className="md:block font-medium cursor-pointer border-solid border-2 py-1 border-blue-500 px-4 mx-[20px] rounded-[10px]">
            <Link to={"/exam"}>Begin The Exam</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReadingPage;
