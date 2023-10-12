import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { ProfileEdit } from "../components/profile/ProfileEdit";
import { ProfileView } from "../components/profile/ProfileView";
import { PostsResponseType } from "./Home";
import PostCard from "../components/home/PostCard";
import { getFriend } from "../redux/features/friends/friendService";
import Loading from "../components/global/Loading";

const Profile = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userPostData = async (userId: string) => {
      try {
        const data = await getFriend(userId);
        setPosts(data.posts);
      } finally {
        setLoading(false);
      }
    };
    userPostData(user.userId.toString());
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <section>
      <div className="card w-auto  flex-row content-center justify-center bg-base-100 shadow-xl m-8">
        {updateMode ? (
          <ProfileEdit user={user} setUpdateMode={setUpdateMode} />
        ) : (
          <ProfileView user={user} setUpdateMode={setUpdateMode} />
        )}
      </div>
      <div className="p-8 my-12 flex content-center justify-center">
        {posts.length == 0 ? (
          <h2 className="text-3xl font-bold">
            No posts yet. Where have you been?
          </h2>
        ) : (
          <section>
            {posts.map((post: PostsResponseType) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </section>
        )}
      </div>
    </section>
  );
};

export default Profile;
