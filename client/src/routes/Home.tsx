import { useEffect, useState } from "react";
import MakePost from "../components/home/MakePost";
import PostCard from "../components/home/PostCard";
import { findAllPosts } from "../redux/features/posts/postService";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const result = await findAllPosts();
      setPosts(result);
    };
    getPosts();
    console.log(posts);
  }, []);
  return (
    <div>
      <section>
        <MakePost />
      </section>
      <section>
        <PostCard />
        <PostCard />
        <PostCard />
      </section>
    </div>
  );
};

export default Home;
