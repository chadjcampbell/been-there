import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";
import { useState } from "react";
import { ProfileEdit } from "../components/profile/ProfileEdit";
import { ProfileView } from "../components/profile/ProfileView";
import { selectPosts } from "../redux/features/posts/postSlice";
import { PostsResponseType } from "./Home";
import PostCard from "../components/home/PostCard";

const Profile = () => {
  const user = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const [updateMode, setUpdateMode] = useState(false);

  const usersPosts = posts.filter(
    (post: PostsResponseType) => post.user_id === user.userId
  );

  return (
    <section>
      <div className="card w-auto  flex-row content-center justify-center bg-base-100 shadow-xl m-8">
        {updateMode ? (
          <ProfileEdit user={user} setUpdateMode={setUpdateMode} />
        ) : (
          <ProfileView user={user} setUpdateMode={setUpdateMode} />
        )}
      </div>
      <div className="p-8 my-12 flex content-center justify-center">
        {usersPosts.length == 0 ? (
          <h2 className="text-3xl font-bold">
            No posts yet. Where have you been?
          </h2>
        ) : (
          <section>
            {usersPosts.map((post: PostsResponseType) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </section>
        )}
      </div>
    </section>
  );
};

export default Profile;
