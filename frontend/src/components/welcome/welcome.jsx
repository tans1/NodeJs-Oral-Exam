import React from "react";
import welcomImage from "../../assets/computer-glasses-woman-1.jpg";
function Welcome() {
  return (
    <div className="flex mt-[100px] justify-between items-center xsm:h-[400px] md:h-[500px] rounded-xl">
      <div className="w-full h-full flex bg-gradient-to-r from-blue-400 to-blue-600 xsm:w-[40%] md:w-[50%]">
        <div className="flex justify-center items-center pl-8">
          <div className="leading-3">
          <p className="font-bold text-4xl text-white">
            Welcome to Mercor Oral Exam
          </p>
          <p className="font-bold text-4xl text-white">
            Take Exam with Confidence
          </p>
          <p className="font-medium my-[30px] text-3xl text-white">
            Excel every exam with our AI
          </p>
          <div className="">
            <p className="flex items-center justify-center bg-white inline-block h-9 text-blue-500 font-bold px-7 rounded-lg">Live Exam with AI</p>
          </div>
          </div>
        </div>
      </div>
      <div className="xsm:w-[60%] md:w-[50%] w-full h-full">
        <img
          src={welcomImage}
          alt="women taking online exam"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default Welcome;
