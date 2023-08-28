import { useEffect, useState } from "react";
import MakePost from "../components/home/MakePost";
import PostCard from "../components/home/PostCard";
import { findAllPosts } from "../redux/features/posts/postService";

export type PostsResponseType = {
  posts: PostType;
  user_name: string;
  user_photo_url: string;
  comment_count: number;
  like_count: number;
  user_has_liked: number;
};

export type PostType = {
  content: string;
  likes: number;
  post_date: Date;
  post_photo_url: string;
  user_id: number;
  post_id: number;
  user_location: UserLocation;
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
  const [posts, setPosts] = useState<PostsResponseType[] | []>([]);

  useEffect(() => {
    const getPosts = async () => {
      const result = await findAllPosts();
      setPosts(result);
    };
    getPosts();
  }, []);
  return (
    <div>
      <section>
        <MakePost />
      </section>
      <section>
        {posts.map((post) => (
          <PostCard key={post.posts.post_id} post={post} />
        ))}
      </section>
    </div>
  );
};

export default Home;
