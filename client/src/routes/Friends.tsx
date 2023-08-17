import { useState } from "react";
import FindFriendModal from "../components/friends/FindFriendModal";
import FriendListCard from "../components/friends/FriendListCard";

export const dummyFriendChatList = [
  {
    name: "Luis1990",
    photoUrl: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1991",
    photoUrl: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1992",
    photoUrl: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1993",
    photoUrl: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1994",
    photoUrl: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
];

export type FriendType = {
  id?: number;
  name: string;
  email?: string;
  photoURL?: string;
  recentMessage?: string;
};

const Friends = () => {
  const [friendList, setFriendList] = useState(dummyFriendChatList);
  return (
    <div className="p-6 flex w-full min-h-screen justify-center">
      <div className="text-center">
        <FindFriendModal />
        <>
          <h1 className="text-3xl font-bold">Friends</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {friendList?.map((friend) => (
              <FriendListCard
                key={friend.name}
                name={friend.name}
                photoURL={
                  friend.photoUrl
                    ? friend.photoUrl
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
