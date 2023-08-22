import { BsPersonFillAdd } from "react-icons/bs";
import { TbUserCancel } from "react-icons/tb";
import { FriendType } from "../../routes/Friends";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../redux/features/friends/friendService";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFriendsList,
  selectPendingFriends,
  SET_FRIENDS_LIST,
  SET_PENDING_FRIENDS,
} from "../../redux/features/friends/friendsSlice";

type FoundFriendCardProps = {
  friend: FriendType;
};

const PendingFriendCard = ({ friend }: FoundFriendCardProps) => {
  const dispatch = useDispatch();
  const currentFriends = useSelector(selectFriendsList);
  const currentPending = useSelector(selectPendingFriends);

  const handleAcceptFriend = async () => {
    try {
      await acceptFriendRequest(friend.user_id);
      dispatch(SET_FRIENDS_LIST([...currentFriends, friend]));
      dispatch(
        SET_PENDING_FRIENDS(
          currentPending.filter(
            (item: FriendType) => item.user_id != friend.user_id
          )
        )
      );
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleRejectFriend = async () => {
    try {
      await rejectFriendRequest(friend.user_id);
      dispatch(
        SET_PENDING_FRIENDS(
          currentPending.filter(
            (item: FriendType) => item.user_id != friend.user_id
          )
        )
      );
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-80 m-4 flex flex-row py-4 px-2 justify-center items-center border-2 rounded-xl ">
      <div className="w-1/4">
        <div className="avatar online">
          <div className=" rounded-full mr-2">
            <img src={friend.photo_url} alt="friend profile pic" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{friend.name}</div>
        <button
          onClick={handleAcceptFriend}
          className="btn btn-sm bg-green-200"
        >
          <BsPersonFillAdd />
          Accept
        </button>
        <button
          onClick={handleRejectFriend}
          className="btn btn-sm ml-2 bg-red-200"
        >
          <TbUserCancel />
          Reject
        </button>
      </div>
    </div>
  );
};

export default PendingFriendCard;
