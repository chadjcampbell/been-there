import { useContext } from "react";
import { FriendContext } from "../context/FriendContext";
import FindFriendModal from "../components/friends/FindFriendModal";
import FriendListCard from "../components/friends/FriendListCard";

const Friends = () => {
  const { friendList, setFriendList } = useContext(FriendContext);
  return (
    <div className="p-6 flex w-full min-h-screen justify-center">
      <div className="text-center">
        <FindFriendModal />
        <>
          <h1 className="text-3xl font-bold">Friends</h1>
          <div className="w-full flex flex-row flex-wrap items-center justify-center">
            {friendList?.map((friend) => (
              <FriendListCard
                key={friend.name}
                name={friend.name}
                photoURL={
                  friend.photoURL
                    ? friend.photoURL
                    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                }
              />
            ))}
          </div>
        </>
        {(friendList === null || friendList.length === 0) && (
          <>
            <h1 className="text-3xl font-bold">No Friends Yet</h1>
            <p className="py-6">
              Get started sharing your travels by finding a friend!
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Friends;
