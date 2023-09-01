import { BsChatDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BsTrash } from "react-icons/bs";
import { FriendType } from "../../routes/Friends";
import { useDispatch } from "react-redux";
import { SET_FRIEND_ID_DELETE } from "../../redux/features/friends/friendsSlice";

type FriendListCardProps = {
  friend: FriendType;
};

const FriendListCard = ({ friend }: FriendListCardProps) => {
  const dispatch = useDispatch();
  const handleDeleteButton = () => {
    window.main_modal.showModal();
    dispatch(SET_FRIEND_ID_DELETE(friend.user_id));
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
        <div className="avatar online">
          <div className=" rounded-full mr-2">
            <img
              src={
                friend.photo_url
                  ? friend.photo_url
                  : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
              }
              alt="friend profile pic"
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{friend.name}</div>
        <button className="btn btn-sm bg-blue-200">
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
