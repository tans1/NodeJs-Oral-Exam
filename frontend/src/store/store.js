import CurrentQuestionReducer from "./slices/singleQuestionHandlerSlice";
import ResultReducer from "./slices/examResultSlice";
import UserReducer from "./slices/userSlice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import sagaFunction from "../saga/saga";

const reducer = combineReducers({
  currentQuestion: CurrentQuestionReducer,
  result: ResultReducer,
  user: UserReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducer,
  middleware: [sagaMiddleware]
});
sagaMiddleware.run(sagaFunction);
