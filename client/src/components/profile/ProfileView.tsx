import { UserType } from "../../redux/features/auth/authSlice";

type ProfileViewProps = {
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
};

export const ProfileView = ({ user, setUpdateMode }: ProfileViewProps) => {
  return (
    <div className="card-body flex-col lg:flex-row">
      <div className="flex content-center justify-center max-h-96 aspect-square">
        <img
          src={user.photoUrl}
          alt={user.name}
          className=" m-6 p-2 rounded-full shadow-sm"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="py-6 text-xs">
          Member since: {new Date(user.registrationDate).toLocaleDateString()}
        </p>
        <p className="py-6">{user.bio}</p>
        <button onClick={() => setUpdateMode(true)} className="btn btn-primary">
          Update Profile
        </button>
      </div>
    </div>
  );
};
