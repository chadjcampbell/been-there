import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  return (
    <section>
      <div className="card w-auto  flex-row content-center justify-center bg-base-100 shadow-xl m-8">
        <div className="card-body flex-col lg:flex-row">
          <div className="flex content-center justify-center max-h-96 aspect-square">
            <img
              src={user.photoUrl}
              className=" m-6 p-2 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold">{user.name}</h1>
            <p className="py-6 text-xs">
              Member since: {user.registrationDate}
            </p>
            <p className="py-6">{user.bio}</p>
            <button className="btn btn-primary">Update Profile</button>
          </div>
        </div>
      </div>
      <div className="p-8 my-12 flex content-center justify-center">
        <h2 className="text-3xl font-bold">
          No posts yet. Where have you been?
        </h2>
      </div>
    </section>
  );
};

export default Profile;
