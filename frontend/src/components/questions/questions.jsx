import React, { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { BsFillPlayFill } from "react-icons/bs";
import { BsFillMicFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { MakeQuestionRead } from "../../store/slices/singleQuestionHandlerSlice";
import { SubmitAnswer } from "../../saga/actions/actions";
import { useNavigate } from "react-router";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import CircularProgress from '@mui/material/CircularProgress';
function Questions() {
  const currentQuestion = useSelector((state) => state.currentQuestion);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const navigate = useNavigate();

  const { transcript, resetTranscript } = useSpeechRecognition();
  const [listening, setListening] = useState(false);
  const [reading, setReading] = useState(false);

  const handleListing = () => {
    setListening(true);
    setReading(false);
    SpeechRecognition.startListening({
      continuous: true
    });
  };

  const StopListening = () => {
    setListening(false);
    if (!listening) {
      SpeechRecognition.stopListening();
    }
  };

  const readQuestion = async () => {
    setReading(true);

    var synthesis = window.speechSynthesis;
    if ("speechSynthesis" in window) {
      var voice = synthesis.getVoices().filter(function (voice) {
        return voice.lang === "en";
      })[0];

      var utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      utterance.voice = voice;
      utterance.pitch = 1.3;
      utterance.rate = 1.0;
      utterance.volume = 1;

      synthesis.speak(utterance);
      setReading(false);
    } else {
      console.log("Text-to-speech not supported.");
    }
    resetTranscript();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 1000 }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : -1000,
        transition: {
          duration: 0.5,
          stiffness: 100,
          type: "spring",
          damping: 8
        }
      }}
      className="select-none">
      <div className="my-4 text-5xl font-bold">
        Question : {currentQuestion.questionNumber}
      </div>
      <div
        className="flex items-center my-2 text-3xl font-semibold text-blue-600 hover:scale-110 cursor-pointer"
        onClick={() => {
          if (!reading && currentQuestion.remaining > 0) {
            readQuestion();
            dispatch(MakeQuestionRead());
          }
        }}>
        <BsFillPlayFill className="mx-3" />
        Play{" "}
        <span className="flex items-center justify-center border-[1px] border-red-600 rounded-[50%] text-red-600 text-base ml-2 h-[20px] w-[20px]">
          {currentQuestion.remaining}
        </span>
      </div>
      <div
        className="flex items-center my-2 text-3xl font-semibold text-blue-600  hover:scale-110 cursor-pointer"
        onClick={listening ? StopListening : handleListing}>
        <BsFillMicFill className="mx-3" /> Answer
      </div>
      <div>
        <div
          className="flex items-center justify-center bg-white inline-block h-9 text-green-600 font-bold px-7 rounded-lg border-green-600 border-2 my-6 hover:scale-110 cursor-pointer"
          onClick={() => {
            dispatch(
              SubmitAnswer({
                answer: transcript,
                number: currentQuestion.questionNumber
              })
            );

            currentQuestion.questionNumber >= 10 ? (
              navigate("/analysis")
            ) : (
              <></>
            );
          }}>
            {
              currentQuestion.loading ? <CircularProgress size={23} color="success"/>  : <>Next</>
            }
           
        </div>
      </div>
    </motion.div>
  );
}

export default Questions;
