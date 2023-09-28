import React from "react";
import test from "../../assets/test.png";
import question from "../../assets/question mark.jpg";
import dataAnalytics from "../../assets/analytics.jpg";

function About() {
  return (
    <div className="mt-[100px] xsm:mx-3 md:mx-[100px]">
      <p className="flex justify-center xsm:text-3xl md:text-4xl font-bold mb-[80px]">
        What we offer?
      </p>
      <div className="grid xsm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="h-[80px] w-[80px]">
            <img src={test} alt="" className="h-full w-full" />
          </div>
          <div>
            <p className="my-[10px] font-medium">Live Test</p>
            <div className="text-gray-700">We provide live tests with AI</div>
          </div>
        </div>
        <div>
          <div className="h-[80px] w-[80px]">
            <img src={question} alt="" className="h-full w-full" />
          </div>
          <div>
            <p className="my-[10px] font-medium">High Yield Questions</p>
            <div className="text-gray-700">
            Elevate your online exams with our curated collection of challenging and impactful questions.
            </div>
          </div>
        </div>
        <div>
          <div className="h-[80px] w-[80px]">
            <img src={dataAnalytics} alt="" className="h-full w-full" />
          </div>
          <div>
            <p className="my-[10px] font-medium">Insightful Analytics</p>
            <div className="text-gray-700">Gain deep understanding and valuable insights from your data with our powerful analytics solutions.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
