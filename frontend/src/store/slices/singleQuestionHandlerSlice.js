import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: "",
  questionNumber: 0,
  remaining: 3,
  finished: false,
  loading: false
};

const SingleQuestion = new createSlice({
  name: "currentQuestion",
  initialState,
  reducers: {
    MakeQuestionRead(state, action) {
      state.remaining -= 1;
    },
    LoadingQuestion(state,action) {
      state.loading = true
    },
    LoadQuestion(state, action) {
      state.loading = false;
      state.question = action.payload.question;
      state.questionNumber = action.payload.questionNumber;
      state.remaining = 3;
    },
    FinishTheExam(state, action) {
      state.finished = true;
    }
  }
});

export const { MakeQuestionRead,LoadingQuestion, LoadQuestion, FinishTheExam } =
  SingleQuestion.actions;
export default SingleQuestion.reducer;
