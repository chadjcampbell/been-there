import { useParams } from "react-router-dom";
import { PostsResponseType } from "../../routes/Home";
import { stringToColor } from "../../utils/stringToColor";
import PostCard from "../home/PostCard";
import { useEffect, useState } from "react";
import { getFriend } from "../../redux/features/friends/friendService";
import { FriendType } from "../../routes/Friends";
import Loading from "../global/Loading";

const FriendProfile = () => {
  const { friendId } = useParams();
  const [friend, setFriend] = useState<FriendType | null>(null);

  useEffect(() => {
    const friendData = async (friendId: string) => {
      const data = await getFriend(friendId);
      setFriend(data);
    };
  }, [friend]);

  return friend ? (
    <section>
      <div className="card w-auto  flex-row content-center justify-center bg-base-100 shadow-xl m-8">
        <div className="card-body flex-col lg:flex-row">
          <div className="flex content-center justify-center max-h-80 aspect-square">
            <img
              className="border-4 rounded-full"
              style={{ borderColor: stringToColor(friend.email) }}
              src={friend.photo_url}
              alt="friend profile pic"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{friend.name}</h1>
            <p className="py-6 text-xs">
              Member since:{" "}
              {new Date(friend.registrationDate).toLocaleDateString()}
            </p>
            <p className="py-6">{friend.bio}</p>
            <div className="flex flex-col justify-center items-start"></div>
          </div>
        </div>
      </div>
      <div className="p-8 my-12 flex content-center justify-center">
        {friendPosts.length == 0 ? (
          <h2 className="text-3xl font-bold">
            No posts yet. Where have you been?
          </h2>
        ) : (
          <section>
            {friendPosts.map((post: PostsResponseType) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </section>
        )}
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default FriendProfile;
