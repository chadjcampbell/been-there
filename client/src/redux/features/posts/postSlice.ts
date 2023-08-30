import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  postIdDelete: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    SET_POSTS(state, action) {
      state.posts = action.payload;
    },
    SET_POST_ID_DELETE(state, action) {
      state.postIdDelete = action.payload;
    },
  },
});

export const { SET_POSTS, SET_POST_ID_DELETE } = postsSlice.actions;

export const selectPosts = (state: any) => state.posts.posts;
export const selectPostIdDelete = (state: any) => state.posts.postIdDelete;

export default postsSlice.reducer;
