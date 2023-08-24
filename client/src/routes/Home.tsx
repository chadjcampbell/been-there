import MakePost from "../components/home/MakePost";
import PostCard from "../components/home/PostCard";

const Home = () => {
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
