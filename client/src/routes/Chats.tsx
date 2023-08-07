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
    <div className=" mx-auto shadow-lg rounded-lg">
      <div className="flex flex-row justify-between bg-white">
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="drawer lg:drawer-open overflow-y-hidden">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                Open drawer
              </label>
            </div>
            <div className="z-10 drawer-side">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                {dummyFriendChatList.map((chat) => (
                  <ChatListCard
                    key={chat.name}
                    name={chat.name}
                    photoURL={chat.photoURL}
                    recentMessage={chat.recentMessage}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            <MyChatMessage />
            <FriendChatMessage />
            <MyChatMessage />
            <FriendChatMessage />
          </div>
          <div className="py-5">
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
