import { toast } from "react-hot-toast";
import { UserType } from "../../redux/features/auth/authSlice";
import { FiExternalLink } from "react-icons/fi";
import { stringToColor } from "../../utils/stringToColor";

type ProfileViewProps = {
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
};

export const ProfileView = ({ user, setUpdateMode }: ProfileViewProps) => {
  const updateBio = () => {
    if (user.userId == 2) {
      toast.error("Demo User can't do that");
    } else {
      setUpdateMode(true);
    }
  };
  return (
    <div className="card-body flex-col lg:flex-row">
      <div className="flex content-center justify-center max-h-80 aspect-square">
        <img
          className="border-4 rounded-full"
          style={{ borderColor: stringToColor(user.email) }}
          src={user.photoUrl}
          alt="friend profile pic"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="py-6 text-xs">
          Member since: {new Date(user.registrationDate).toLocaleDateString()}
        </p>
        <p className="py-6">{user.bio}</p>
        <div className="flex flex-col justify-center items-start">
          {user.userId == 2 && (
            <a
              className="btn btn-secondary my-4"
              href="https://www.chadjcampbell.com"
              target="_blank"
            >
              chadjcampbell.com <FiExternalLink />
            </a>
          )}
          <button onClick={updateBio} className="btn btn-primary">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};
