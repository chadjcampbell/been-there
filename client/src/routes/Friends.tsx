import { useEffect, useState } from "react";
import FindFriendModal from "../components/friends/FindFriendModal";
import FriendListCard from "../components/friends/FriendListCard";
import PendingFriendCard from "../components/friends/PendingFriendCard";
import {
  findAllFriends,
  getPendingFriends,
} from "../redux/features/friends/friendService";

export type FriendType = {
  user_id: number;
  name: string;
  email: string;
  photo_url: string;
};

const Friends = () => {
  const [friendList, setFriendList] = useState<FriendType[] | []>([]);
  const [pendingFriends, setPendingFriends] = useState<FriendType[] | []>([]);

  useEffect(() => {
    const findPendingFriends = async () => {
      const result = await getPendingFriends();
      setPendingFriends(result);
    };
    const getAllFriends = async () => {
      const result = await findAllFriends();
      setFriendList(result);
    };
    findPendingFriends();
    getAllFriends();
  }, []);

  return (
    <div className="p-6 flex w-full min-h-screen justify-center">
      <div className="text-center">
        <FindFriendModal />
        {pendingFriends?.length > 0 && (
          <>
            <h1 className="text-3xl font-bold">Pending Friend Requests</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {pendingFriends?.map((friend) => (
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
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {friendList?.map((friend) => (
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
