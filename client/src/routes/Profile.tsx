import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";
import { useState } from "react";
import { ProfileEdit } from "../components/profile/ProfileEdit";
import { ProfileView } from "../components/profile/ProfileView";

const Profile = () => {
  const user = useSelector(selectUser);
  const [updateMode, setUpdateMode] = useState(false);
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
          {updateMode ? (
            <ProfileEdit user={user} setUpdateMode={setUpdateMode} />
          ) : (
            <ProfileView user={user} setUpdateMode={setUpdateMode} />
          )}
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
