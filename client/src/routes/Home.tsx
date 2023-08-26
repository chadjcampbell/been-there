import { useEffect, useState } from "react";
import MakePost from "../components/home/MakePost";
import PostCard from "../components/home/PostCard";
import { findAllPosts } from "../redux/features/posts/postService";

type UserAttachedToPost = {
  name: string;
  photo_url: string;
};

export type PostType = {
  content: string;
  likes: number;
  post_date: Date;
  post_photo_url: string;
  user_id: UserAttachedToPost;
};

const Home = () => {
  const [posts, setPosts] = useState<PostType[] | []>([]);

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
          <PostCard post={post} />
        ))}
      </section>
    </div>
  );
};

export default Home;
