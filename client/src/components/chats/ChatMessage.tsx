const ChatMessage = () => {
  return <h1>user</h1>;
};

export default ChatMessage;

const MyChatMessage = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
            alt="my profile pic"
          />
        </div>
      </div>
      <div className="chat-bubble chat-bubble-secondary">
        It was said that you would, destroy the Sith, not join them.
      </div>
    </div>
  );
};

const FriendChatMessage = () => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
            alt="friends profile pic"
          />
        </div>
      </div>
      <div className="chat-bubble chat-bubble-primary">
        It was said that you would, destroy the Sith, not join them.
      </div>
    </div>
  );
};

export { MyChatMessage, FriendChatMessage };
