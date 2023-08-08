import { BsChatDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

type FriendListCardProps = {
  name: string;
  photoURL: string;
};

const FriendListCard = ({ name, photoURL }: FriendListCardProps) => {
  return (
    <div className="w-80 m-4 flex flex-row py-4 px-2 justify-center items-center border-2 rounded-xl ">
      <div className="w-1/4">
        <div className="avatar online">
          <div className=" rounded-full mr-2">
            <img src={photoURL} alt="friend profile pic" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{name}</div>
        <button className="btn btn-sm">
          <BsChatDots />
          Chat
        </button>
        <button className="btn btn-sm ml-2">
          <CgProfile />
          Profile
        </button>
      </div>
    </div>
  );
};

export default FriendListCard;
