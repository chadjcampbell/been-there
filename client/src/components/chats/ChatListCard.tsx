import { useDispatch, useSelector } from "react-redux";
import { FriendType } from "../../routes/Friends";
import {
  SET_CHAT_ID,
  selectChatId,
} from "../../redux/features/chats/chatSlice";
import { selectOnlineFriends } from "../../redux/features/friends/friendsSlice";
import { stringToColor } from "../../utils/stringToColor";

type ChatListCardProps = {
  friend: FriendType;
  drawerRef: React.MutableRefObject<HTMLInputElement | null>;
};

const ChatListCard = ({ friend, drawerRef }: ChatListCardProps) => {
  const activeChat = useSelector(selectChatId);
  const onlineFriends: string[] = useSelector(selectOnlineFriends);
  const dispatch = useDispatch();

  const setChatId = () => {
    drawerRef.current?.click();
    dispatch(SET_CHAT_ID(friend.user_id));
  };
  return (
    <li>
      <button
        onClick={setChatId}
        className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 rounded-lg mb-2 ${
          activeChat === friend.user_id ? "btn-primary" : "btn-ghost"
        }`}
      >
        <div className="w-1/4">
          <div
            className={`avatar ${
              onlineFriends.includes(friend.user_id.toString())
                ? "online"
                : "offline"
            }`}
          >
            <div className="mr-2">
              <img
                className={`border-4 rounded-full`}
                style={{ borderColor: stringToColor(friend.email) }}
                src={friend.photo_url}
                alt="friend profile pic"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="text-lg font-semibold">{friend.name}</div>
        </div>
      </button>
    </li>
  );
};

export default ChatListCard;
