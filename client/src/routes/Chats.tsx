import ChatListCard from "../components/chats/ChatListCard";
import {
  FriendChatMessage,
  MyChatMessage,
} from "../components/chats/ChatMessage";
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
    <div className=" mx-auto w-full">
      <div className="z-10 drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col-reverse items-center justify-center h-[calc(100vh-4rem)]">
          {/* Page content here */}
          <div className="flex flex-col border-r-2 overflow-y-auto h-full w-full justify-end">
            <div className="w-full px-5 flex flex-col justify-between">
              <div className="flex flex-col mt-5">
                <MyChatMessage />
                <FriendChatMessage />
                <MyChatMessage />
                <FriendChatMessage />
              </div>
              <div className="py-5">
                <form className="flex items-center justify-center">
                  <input
                    className="w-full bg-gray-300 py-5 px-3 rounded-xl mr-3"
                    type="text"
                    placeholder="type your message here..."
                  />
                  <button type="submit" className="btn btn-secondary">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>

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
              friendList.map((chat: FriendType) => (
                <ChatListCard
                  key={chat.name}
                  name={chat.name}
                  photoURL={
                    chat.photo_url
                      ? chat.photo_url
                      : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }
                  recentMessage={""}
                />
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
