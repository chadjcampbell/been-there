import { UserType } from "../../redux/features/auth/authSlice";

type ProfileViewProps = {
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
};

export const ProfileView = ({ user, setUpdateMode }: ProfileViewProps) => {
  return (
    <div>
      <h1 className="text-5xl font-bold">{user.name}</h1>
      <p className="py-6 text-xs">
        Member since: {new Date(user.registrationDate).toLocaleDateString()}
      </p>
      <p className="py-6">{user.bio}</p>
      <button onClick={() => setUpdateMode(true)} className="btn btn-primary">
        Update Profile
      </button>
    </div>
  );
};
