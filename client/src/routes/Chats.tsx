import ChatListCard from "../components/chats/ChatListCard";

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
          {dummyFriendChatList.map((chat) => (
            <ChatListCard
              key={chat.name}
              name={chat.name}
              photoURL={chat.photoURL}
              recentMessage={chat.recentMessage}
            />
          ))}
        </div>

        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                Welcome to group everyone !
              </div>
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
            </div>
            <div className="flex justify-start mb-4">
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                at praesentium, aut ullam delectus odio error sit rem.
                Architecto nulla doloribus laborum illo rem enim dolor odio
                saepe, consequatur quas?
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <div>
                <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Magnam, repudiandae.
                </div>

                <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Debitis, reiciendis!
                </div>
              </div>
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
            </div>
            <div className="flex justify-start mb-4">
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                happy holiday guys!
              </div>
            </div>
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
