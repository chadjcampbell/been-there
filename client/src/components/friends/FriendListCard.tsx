import { BsChatDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BsTrash } from "react-icons/bs";
import { FriendType } from "../../routes/Friends";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_FRIEND_ID_DELETE,
  selectOnlineFriends,
} from "../../redux/features/friends/friendsSlice";
import { SET_CHAT_ID } from "../../redux/features/chats/chatSlice";
import { useNavigate } from "react-router-dom";
import { stringToColor } from "../../utils/stringToColor";

type FriendListCardProps = {
  friend: FriendType;
};

const FriendListCard = ({ friend }: FriendListCardProps) => {
  const onlineFriends: string[] = useSelector(selectOnlineFriends);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteButton = () => {
    window.main_modal.showModal();
    dispatch(SET_FRIEND_ID_DELETE(friend.user_id));
  };

  const handleChatClick = () => {
    dispatch(SET_CHAT_ID(friend.user_id));
    navigate("/chats");
  };

  return (
    <div className="relative w-80 m-4 flex flex-row py-4 px-2 justify-center items-center border-2 rounded-xl ">
      <button
        onClick={handleDeleteButton}
        className="absolute top-2 right-3 btn btn-xs btn-error"
      >
        <BsTrash size="20" />
      </button>
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
        <button onClick={handleChatClick} className="btn btn-sm bg-blue-200">
          <BsChatDots />
          Chat
        </button>
        <button className="btn btn-sm ml-2 bg-purple-200">
          <CgProfile />
          Profile
        </button>
      </div>
    </div>
  );
};

export default FriendListCard;
