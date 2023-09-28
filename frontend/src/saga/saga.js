import { call, put, all, takeEvery } from "redux-saga/effects";
import { FinishTheExam } from "../store/slices/singleQuestionHandlerSlice";
import {
  create_questions_api,
  fetch_questions_api,
  submit_answer_api,
  register_user,
  login_user
} from "./api/api";

import {
  FetchQuestion,
  CreateQuestions,
  SubmitAnswer,
  RegisterUser,
  LoginUser
} from "./actions/actions";
import { LoadQuestion,LoadingQuestion } from "../store/slices/singleQuestionHandlerSlice";
import { StoreResult } from "../store/slices/examResultSlice";
import { Registered, Authenticated } from "../store/slices/userSlice";
function* sagaFunction() {
  yield all([
    takeEvery(CreateQuestions, createQuestions),
    takeEvery(FetchQuestion, fetchQuestion),
    takeEvery(SubmitAnswer, submitAnswer),
    takeEvery(RegisterUser, registerUser),
    takeEvery(LoginUser, loginUser)
  ]);
}

function* registerUser(action) {
  const response = yield call(register_user, action.payload);
  if (response.error === true) {
    alert("Invalid Credentials");
    return;
  }
  yield put(Registered());
}
function* loginUser(action) {
  const response = yield call(login_user, action.payload);
  if (response.error === true) {
    alert("Invalid Credentials");
    return;
  }
  yield put(Authenticated(response.user_fullName));
}

function* createQuestions() {
  yield call(create_questions_api);
}

function* fetchQuestion(action) {
  const response = yield call(fetch_questions_api, action.payload);
  yield put(
    LoadQuestion({
      questionNumber: action.payload,
      question: response
    })
  );
}

function* submitAnswer(action) {
  const data = action.payload;
  yield put(LoadingQuestion());
  const result = yield call(submit_answer_api, data);
  const response = yield call(fetch_questions_api, data.number + 1);
  yield put(StoreResult(result));
  yield put(
    LoadQuestion({
      questionNumber: data.number + 1,
      question: response
    })
  );
}

export default sagaFunction;
