import MakePost from "../components/home/MakePost";
import PostCard from "../components/home/PostCard";
import { FriendType } from "./Friends";
import { useSelector } from "react-redux";
import { selectPosts } from "../redux/features/posts/postSlice";
import DeletePostModal from "../components/home/DeletePostModal";

export type PostsResponseType = {
  content: string;
  likes: LikesType[];
  post_date: Date;
  post_photo_url: string;
  user_id: number;
  post_id: number;
  user_location: UserLocation;
  user: FriendType;
  comments: CommentType[];
};

export type LikesType = {
  like_id: number;
  user_id: number;
  target_id: number;
  target_type: string;
};

export type CommentType = {
  comment_id: number;
  post_id: number;
  user_id: number;
  content: string;
  likes: LikesType[];
  user: FriendType;
  comment_photo_url: string;
  comment_date: Date;
};

export type UserLocation = {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
  readme: string;
};

const Home = () => {
  const posts: PostsResponseType[] | [] = useSelector(selectPosts);

  return (
    <div>
      <DeletePostModal />
      <section>
        <MakePost />
      </section>
      <section>
        {posts.map((post) => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </section>
      <div className="flex items-center justify-center py-24">
        Loading... (coming soon)
      </div>
    </div>
  );
};

export default Home;
