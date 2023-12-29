import { ChatMessageType } from "../../redux/features/chats/chatSlice";
import moment from "moment";

type ChatMessageProps = {
  chat: ChatMessageType;
};

const MyChatMessage = ({ chat }: ChatMessageProps) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={chat.user1.photo_url} alt="my profile pic" />
        </div>
      </div>
      <div className="chat-bubble chat-bubble-secondary">
        {chat.message_photo_url && (
          <figure className="flex flex-col ">
            <div className="max-w-md m-4">
              <img
                className="rounded-xl object-contain"
                src={chat.message_photo_url}
                alt="User post photo"
              />
            </div>
          </figure>
        )}
        {chat.message_text}
      </div>
      <div className="chat-footer opacity-50">
        {moment(chat.timestamp).calendar()}
      </div>
    </div>
  );
};

const FriendChatMessage = ({ chat }: ChatMessageProps) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={chat.user1.photo_url} alt="friends profile pic" />
        </div>
      </div>
      <div className="chat-bubble chat-bubble-primary">
        {chat.message_photo_url && (
          <figure className="flex flex-col ">
            <div className="max-w-md m-4">
              <img
                className="rounded-xl object-contain"
                src={chat.message_photo_url}
                alt="User post photo"
              />
            </div>
          </figure>
        )}
        {chat.message_text}
      </div>
      <div className="chat-footer opacity-50">
        {moment(chat.timestamp).calendar()}
      </div>
    </div>
  );
};

export { MyChatMessage, FriendChatMessage };
