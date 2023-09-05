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
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector(selectUser).userId;
  const chatId = useSelector(selectChatId);
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        setIsLoading(true);
        const result = await findChat(chatId);
        if (result) {
          setChats(result);
          // Scroll to the bottom of the chat container after new messages are received
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    getChats();
  }, [chatId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Introduce a small delay before scrolling to the bottom
    const delayScroll = setTimeout(scrollToBottom, 100);
    // Clear the timeout when the component unmounts or when chats change
    return () => clearTimeout(delayScroll);
  }, [chats]);

  return isLoading ? (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <span className="loading loading-spinner text-secondary loading-lg"></span>
    </div>
  ) : (
    <div
      className="flex flex-col mt-5 h-[calc(100vh-8rem)] overflow-y-auto scroll-smooth"
      ref={chatContainerRef}
    >
      {chats.length > 0 ? (
        chats.map((chat: ChatMessageType) =>
          chat.sender_id === userId ? (
            <MyChatMessage key={chat.message_id} chat={chat} />
          ) : (
            <FriendChatMessage key={chat.message_id} chat={chat} />
          )
        )
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
          <h2 className="italic text-lg text-slate-800">No messages found</h2>
        </div>
      )}
      {/* Call scrollToBottom whenever you want to scroll to the bottom */}
      <div ref={scrollToBottom}></div>
    </div>
  );
});

export default ChatDisplay;
