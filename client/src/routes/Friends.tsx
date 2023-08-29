import { useEffect, useState } from "react";
import FindFriendModal from "../components/friends/FindFriendModal";
import FriendListCard from "../components/friends/FriendListCard";
import PendingFriendCard from "../components/friends/PendingFriendCard";
import {
  findAllFriends,
  getPendingFriends,
} from "../redux/features/friends/friendService";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_FRIENDS_LIST,
  SET_PENDING_FRIENDS,
  selectFriendsList,
  selectPendingFriends,
} from "../redux/features/friends/friendsSlice";
import { toast } from "react-hot-toast";

export type FriendType = {
  user_id: number;
  name: string;
  email: string;
  photo_url: string;
};

const Friends = () => {
  const friendList = useSelector(selectFriendsList);
  const [loading, setLoading] = useState(!friendList.length);
  const pendingFriends = useSelector(selectPendingFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingFriendsResult = await getPendingFriends();
        dispatch(SET_PENDING_FRIENDS(pendingFriendsResult));
        const allFriendsResult = await findAllFriends();
        dispatch(SET_FRIENDS_LIST(allFriendsResult));
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [friendList.length]);

  return loading ? (
    <span className="loading loading-spinner text-secondary loading-lg"></span>
  ) : (
    <div className="p-6 flex w-full max-w-7xl min-h-screen justify-center">
      <div className="text-center">
        <FindFriendModal />
        {pendingFriends?.length > 0 && (
          <>
            <h1 className="text-3xl font-bold">Pending Friend Requests</h1>
            <div className="w-full flex flex-wrap justify-center items-center">
              {pendingFriends?.map((friend: FriendType) => (
                <PendingFriendCard key={friend.user_id} friend={friend} />
              ))}
            </div>
          </>
        )}
        {friendList === null || friendList.length === 0 ? (
          <>
            <h1 className="text-3xl font-bold">No Friends Yet</h1>
            <p className="py-6">
              Get started sharing your travels by finding a friend!
            </p>
          </>
        ) : (
          <>
            {" "}
            <h1 className="text-3xl font-bold">Friends</h1>
            <div className="w-full flex flex-wrap justify-center items-center">
              {friendList?.map((friend: FriendType) => (
                <FriendListCard
                  key={friend.user_id}
                  name={friend.name}
                  photoURL={
                    friend.photo_url
                      ? friend.photo_url
                      : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Friends;
