import { createSlice } from "@reduxjs/toolkit";
import { FriendType } from "../../../routes/Friends";

export type ChatMessageType = {
  message_id: number;
  sender_id: number;
  receiver_id: number;
  message_text: string;
  message_photo_url?: string;
  timestamp: Date;
  user1: FriendType;
  user2: FriendType;
};

const initialState = {
  chatId: null,
  chatArray: [],
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
