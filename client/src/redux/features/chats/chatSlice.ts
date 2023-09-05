import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    SET_CHAT_ID(state, action) {
      state.chatId = action.payload;
    },
  },
});

export const { SET_CHAT_ID } = chatsSlice.actions;

export const selectChatId = (state: any) => state.chats.chatId;

export default chatsSlice.reducer;
