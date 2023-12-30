import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [] as any[],
  postIdDelete: null,
  commentIdDelete: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    SET_POSTS(state, action) {
      state.posts = [...action.payload];
    },
    SET_POST_ID_DELETE(state, action) {
      state.postIdDelete = action.payload;
    },
    SET_COMMENT_ID_DELETE(state, action) {
      state.commentIdDelete = action.payload;
    },
  },
});

export const { SET_POSTS, SET_POST_ID_DELETE, SET_COMMENT_ID_DELETE } =
  postsSlice.actions;

export const selectPosts = (state: any) => state.posts.posts;
export const selectPostIdDelete = (state: any) => state.posts.postIdDelete;
export const selectCommentIdDelete = (state: any) =>
  state.posts.commentIdDelete;

export default postsSlice.reducer;
