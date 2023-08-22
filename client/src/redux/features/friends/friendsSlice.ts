import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendsList: [],
  pendingFriends: [],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    SET_FRIENDS_LIST(state, action) {
      state.friendsList = action.payload;
    },
    SET_PENDING_FRIENDS(state, action) {
      state.pendingFriends = action.payload;
    },
  },
});

export const { SET_FRIENDS_LIST, SET_PENDING_FRIENDS } = friendsSlice.actions;

export const selectFriendsList = (state: any) => state.friends.friendsList;
export const selectPendingFriends = (state: any) =>
  state.friends.pendingFriends;

export default friendsSlice.reducer;
