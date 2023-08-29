import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    SET_POSTS(state, action) {
      state.posts = action.payload;
    },
  },
});

export const { SET_POSTS } = postsSlice.actions;

export const selectPosts = (state: any) => state.posts.posts;

export default postsSlice.reducer;
