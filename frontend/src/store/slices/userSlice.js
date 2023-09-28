import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  authenticated: false,
  registered: false,
  user_fullName: ""
};

const UserSlice = new createSlice({
  name: "user",
  initialState,
  reducers: {
    Authenticating(state, action) {
      state.loading = true;
    },
    Authenticated(state, action) {
      state.loading = false;
      state.authenticated = true;
      state.registered = true;
      state.user_fullName = action.payload;
    },
    Registered(state, action) {
      state.loading = false;
      state.registered = true;
    },
    LogOut(state, action) {
      state.loading = false;
      state.authenticated = false;
      state.registered = false;
    }
  }
});

export const { Authenticating, Authenticated, LogOut, Registered } =
  UserSlice.actions;
export default UserSlice.reducer;
