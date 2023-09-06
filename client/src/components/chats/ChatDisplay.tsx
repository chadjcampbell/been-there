import { useDispatch, useSelector } from "react-redux";
import { MyChatMessage, FriendChatMessage } from "./ChatMessage";
import {
  ChatMessageType,
  SET_CHAT_ARRAY,
  selectChatArray,
  selectChatId,
} from "../../redux/features/chats/chatSlice";
import { memo, useEffect, useRef, useState } from "react";
import { findChat } from "../../redux/features/chats/chatService";
import { selectUser } from "../../redux/features/auth/authSlice";
import { AnimatePresence, motion, spring } from "framer-motion";

const ChatDisplay = memo(() => {
  const dispatch = useDispatch();
  const chatArray = useSelector(selectChatArray);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector(selectUser).userId;
  const chatId = useSelector(selectChatId);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        setIsLoading(true);
        const result = await findChat(chatId);
        if (result) {
          dispatch(SET_CHAT_ARRAY(result));
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
  }, [chatArray]);

  return isLoading ? (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <span className="loading loading-spinner text-secondary loading-lg"></span>
    </div>
  ) : (
    <div
      className="flex flex-col mt-5 h-[calc(100vh-8rem)] overflow-y-auto scroll-smooth pr-4"
      ref={chatContainerRef}
    >
      {chatArray.length > 0 ? (
        <AnimatePresence initial={false}>
          {chatArray.map((chat: ChatMessageType) => (
            <motion.div
              key={chat.message_id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {chat.sender_id === userId ? (
                <MyChatMessage chat={chat} />
              ) : (
                <FriendChatMessage chat={chat} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
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
