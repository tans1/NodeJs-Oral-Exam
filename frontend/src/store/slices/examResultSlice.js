import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TotalNumber: 0,
  Points: 0
};

const ResultSlice = new createSlice({
  name: "currentQuestion",
  initialState,
  reducers: {
    StoreResult(state, action) {
      state.TotalNumber += 1;
      state.Points += action.payload;
    }
  }
});

export const { StoreResult } = ResultSlice.actions;
export default ResultSlice.reducer;
