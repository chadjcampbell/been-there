import { useEffect, useState } from "react";
import ChatListCard from "../components/chats/ChatListCard";
import {
  FriendChatMessage,
  MyChatMessage,
} from "../components/chats/ChatMessage";
import { FriendType } from "./Friends";
import { findAllFriends } from "../redux/features/friends/friendService";

const Chats = () => {
  const [friendList, setFriendList] = useState<FriendType[] | []>([]);
  useEffect(() => {
    const getAllFriends = async () => {
      const result = await findAllFriends();
      setFriendList(result);
    };
    getAllFriends();
  }, []);

  return (
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
              friendList.map((chat) => (
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
