import { createSlice } from "@reduxjs/toolkit";

const state = {
  id: null,
  login: null,
  email: null,
  avatar: null,
  stateChange: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => {
      return {
        ...state,
        id: payload.id,
        login: payload.login,
        email: payload.email,
        avatar: payload.avatar,
      };
    },
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectUser = (state) => state.auth;
