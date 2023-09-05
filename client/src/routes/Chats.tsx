import ChatListCard from "../components/chats/ChatListCard";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_FRIENDS_LIST,
  SET_PENDING_FRIENDS,
  selectFriendsList,
} from "../redux/features/friends/friendsSlice";
import { FriendType } from "./Friends";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getPendingFriends,
  findAllFriends,
} from "../redux/features/friends/friendService";
import Loading from "../components/global/Loading";
import ChatArea from "../components/chats/ChatArea";

const Chats = () => {
  const friendList = useSelector(selectFriendsList);
  const [loading, setLoading] = useState(!friendList.length);
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
    <Loading />
  ) : (
    <div className="w-full">
      <div className="z-10 drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col-reverse items-center justify-center">
          <ChatArea />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-secondary mt-2 drawer-button lg:hidden"
          >
            Open Chats
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <section className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {friendList ? (
              friendList.map((friend: FriendType) => (
                <ChatListCard key={friend.user_id} friend={friend} />
              ))
            ) : (
              <p className="text-xl">No chats yet</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Chats;
