import ChatListCard from "../components/chats/ChatListCard";
import {
  FriendChatMessage,
  MyChatMessage,
} from "../components/chats/ChatMessage";

const dummyFriendChatList = [
  {
    name: "Luis1990",
    photoURL: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1991",
    photoURL: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1992",
    photoURL: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1993",
    photoURL: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
  {
    name: "Luis1994",
    photoURL: "https://source.unsplash.com/_7LbC5J-jw4/600x600",
    recentMessage: "Pick me at 9:00 Am",
  },
];

const Chats = () => {
  return (
    <div className=" mx-auto ">
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
                  <button className="btn btn-secondary">Send</button>
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
            {dummyFriendChatList.map((chat) => (
              <ChatListCard
                key={chat.name}
                name={chat.name}
                photoURL={chat.photoURL}
                recentMessage={chat.recentMessage}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Chats;
