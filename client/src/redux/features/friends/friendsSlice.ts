import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendsList: [],
  pendingFriends: [],
  onlineFriends: [],
  friendIdDelete: null,
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
    SET_ONLINE_FRIENDS(state, action) {
      state.onlineFriends = action.payload;
    },
    SET_FRIEND_ID_DELETE(state, action) {
      state.friendIdDelete = action.payload;
    },
  },
});

export const {
  SET_FRIENDS_LIST,
  SET_PENDING_FRIENDS,
  SET_ONLINE_FRIENDS,
  SET_FRIEND_ID_DELETE,
} = friendsSlice.actions;

export const selectFriendsList = (state: any) => state.friends.friendsList;
export const selectPendingFriends = (state: any) =>
  state.friends.pendingFriends;
export const selectOnlineFriends = (state: any) => state.friends.onlineFriends;
export const selectFriendIdDelete = (state: any) =>
  state.friends.friendIdDelete;

export default friendsSlice.reducer;
