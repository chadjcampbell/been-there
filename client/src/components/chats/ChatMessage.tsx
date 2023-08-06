const ChatMessage = () => {
  return <h1>user</h1>;
};

export default ChatMessage;

const MyChatMessage = () => {
  return (
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
  );
};

const FriendChatMessage = () => {
  return (
    <div className="flex justify-start mb-4">
      <img
        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
        className="object-cover h-8 w-8 rounded-full"
        alt=""
      />
      <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat at
        praesentium, aut ullam delectus odio error sit rem. Architecto nulla
        doloribus laborum illo rem enim dolor odio saepe, consequatur quas?
      </div>
    </div>
  );
};

export { MyChatMessage, FriendChatMessage };
