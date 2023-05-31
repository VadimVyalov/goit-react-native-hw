import { createSlice } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
//import * as Crypto from "expo-crypto";
const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [] },
  reducers: {
    addPost(state, { payload }) {
      state.posts.push(payload);
    },
    deletePost(state, { payload }) {
      state.posts = []; //state.posts.filter((post) => post.id !== payload);
      state.comments = [];
    },
    addComment(state, { payload }) {
      state.comments.push(payload);
    },
  },
});

const persistConfig = {
  key: "posts",
  storage: AsyncStorage,
};

export const postsReducer = persistReducer(persistConfig, postsSlice.reducer);

export const { addPost, deletePost, addComment } = postsSlice.actions;

//=== SELECTOR ===

export const selectPosts = (state) => state.posts.posts;
export const selectComments = (state) => state.posts.comments;
