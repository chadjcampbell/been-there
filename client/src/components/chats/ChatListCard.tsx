type ChatListCardProps = {
  name: string;
  photoURL: string;
  recentMessage: string;
};

const ChatListCard = ({ name, photoURL, recentMessage }: ChatListCardProps) => {
  return (
    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
      <div className="w-1/4">
        <img
          src={photoURL}
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{name}</div>
        <span className="text-gray-500">{recentMessage}</span>
      </div>
    </div>
  );
};

export default ChatListCard;
