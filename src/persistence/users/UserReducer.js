import { createSlice } from "@reduxjs/toolkit";

const UserReducer = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    data: {},
  },
  reducers: {
    signInSuccess(state, { payload }) {
      state.loggedIn = true;
      state.data = payload;
    },
    signUpSuccess(state, { payload }) {
      state.loggedIn = true;
      state.data = payload;
    },
    signOutSuccess(state, { payload }) {
      state.loggedIn = false;
      state.data = {};
    },
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = UserReducer;
// Extract and export each action creator by name
export const { signInSuccess, signUpSuccess, signOutSuccess } = actions;
// Export the reducer, either as a default or named export
export default reducer;
