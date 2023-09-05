import { useDispatch } from "react-redux";
import { FriendType } from "../../routes/Friends";
import { SET_CHAT_ID } from "../../redux/features/chats/chatSlice";

type ChatListCardProps = {
  friend: FriendType;
};

const ChatListCard = ({ friend }: ChatListCardProps) => {
  const dispatch = useDispatch();

  const setChatId = () => {
    dispatch(SET_CHAT_ID(friend.user_id));
  };
  return (
    <button
      onClick={setChatId}
      className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
    >
      <div className="w-1/4">
        <div className="avatar online">
          <div className=" rounded-full mr-2">
            <img src={friend.photo_url} alt="friend profile pic" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{friend.name}</div>
      </div>
    </button>
  );
};

export default ChatListCard;
