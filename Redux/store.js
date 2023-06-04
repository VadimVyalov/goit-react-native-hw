import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./post/postsReucer";
import { authReducer } from "./auth/authReducer";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});
