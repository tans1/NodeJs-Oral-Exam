import { createAction } from "@reduxjs/toolkit";

export const RegisterUser = createAction("RegisterUser", (data) => ({
  payload: data
}));
export const LoginUser = createAction("LoginUser", (data) => ({
  payload: data
}));
export const CreateQuestions = createAction("CreateQuestions");
export const FetchQuestion = createAction("FetchQuestion", (data) => ({
  payload: data
}));
export const SubmitAnswer = createAction("SubmitAnswer", (data) => ({
  payload: data
}));
