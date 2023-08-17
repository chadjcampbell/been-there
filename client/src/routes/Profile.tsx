import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  return (
    <div className="card w-auto  flex-row content-center justify-center bg-base-100 shadow-xl m-8">
      <div className="card-body flex-col lg:flex-row">
        <img
          src={user.photo}
          className="max-h-96 m-6 p-2 rounded-lg shadow-sm"
        />
        <div>
          <h1 className="text-5xl font-bold">{user.name}</h1>
          <p className="py-6">{user.bio}</p>
          <button className="btn btn-primary">Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
