import { BsPersonFillAdd } from "react-icons/bs";
import { FriendType } from "../../routes/Friends";
import { sendFriendRequest } from "../../redux/features/friends/friendService";
import { toast } from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

type FoundFriendCardProps = {
  friend: FriendType;
  setFoundFriends: Dispatch<SetStateAction<never[]>>;
};

const FoundFriendCard = ({ friend, setFoundFriends }: FoundFriendCardProps) => {
  const handleAddFriend = async () => {
    try {
      const result = await sendFriendRequest(friend.user_id);
      window.find_friend_modal.close();
      setFoundFriends([]);
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
        <button onClick={handleAddFriend} className="btn btn-sm">
          <BsPersonFillAdd />
          AddFriend
        </button>
      </div>
    </div>
  );
};

export default FoundFriendCard;
