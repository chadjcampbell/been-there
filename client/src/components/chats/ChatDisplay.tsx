import { useSelector } from "react-redux";
import { MyChatMessage, FriendChatMessage } from "./ChatMessage";
import {
  ChatMessageType,
  selectChatId,
} from "../../redux/features/chats/chatSlice";
import { memo, useEffect, useRef, useState } from "react";
import { findChat } from "../../redux/features/chats/chatService";
import { selectUser } from "../../redux/features/auth/authSlice";

const ChatDisplay = memo(() => {
  const userId = useSelector(selectUser).userId;
  const chatId = useSelector(selectChatId);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      const result = await findChat(chatId);
      if (result) {
        setChats(result);
      }
    };
    getChats();
  }, [chatId]);
  console.log(chats);
  return chats.length > 0 ? (
    <div className="flex flex-col-reverse mt-5">
      {chats.map((chat: ChatMessageType) =>
        chat.sender_id == userId ? (
          <MyChatMessage key={chat.message_id} chat={chat} />
        ) : (
          <FriendChatMessage key={chat.message_id} chat={chat} />
        )
      )}
    </div>
  ) : (
    <h2>No messages found</h2>
  );
});

export default ChatDisplay;
