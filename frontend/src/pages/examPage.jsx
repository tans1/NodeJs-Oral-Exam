import React, { useState, useEffect } from "react";
import Questions from "../components/questions/questions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FetchQuestion } from "../saga/actions/actions";

function ExamPage() {
  const dispatch = useDispatch();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(50);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
      dispatch(FetchQuestion(1));
    let timer;
    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timer);
    } else {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(timer);
            } else {
              setHours((prevHours) => prevHours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="select-none">
      <nav className="flex justify-between items-center xsm:h-[40px] md:h-16 relative">
        <div className="brand_container flex items-end">
          <div className="font-bold md:text-2xl lg:text-3xl text-blue-500 cursor-pointer">
            <Link to={"/"}>Mercor Oral Exam</Link>
          </div>
        </div>
        <div className="auth_container text-sm flex items-end font-medium">
          <div className="xsm:hidden md:block cursor-pointer border-solid border-2 py-1 border-blue-500 px-4 mx-[20px] rounded-[10px]">
            Remaining <span>{String(hours).padStart(2, "0")}</span>:
            <span>{String(minutes).padStart(2, "0")}</span>:
            <span>{String(seconds).padStart(2, "0")}</span>
          </div>
        </div>
      </nav>
      <div className="h-[90vh] flex justify-center items-center">
        <Questions />
      </div>
    </div>
  );
}

export default ExamPage;
