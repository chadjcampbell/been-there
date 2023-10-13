import MakePost from "../components/home/MakePost";
import PostCard from "../components/home/PostCard";
import { FriendType } from "./Friends";
import { useCallback, useRef, useState } from "react";
import usePosts from "../hooks/usePosts";
import toast from "react-hot-toast";

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
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
};

const Home = () => {
  const [offset, setOffset] = useState(0);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(offset);

  const intObserver = useRef<any>(null);
  const lastPostRef = useCallback(
    (post: HTMLDivElement) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setOffset((prev) => prev + 5);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) toast.error(error.message);

  const content = results.map((post, i) => {
    if (results.length === i + 1) {
      return <PostCard ref={lastPostRef} key={post.post_id} post={post} />;
    }
    return <PostCard key={post.post_id} post={post} />;
  });

  return (
    <div>
      <section>
        <MakePost />
      </section>
      {content}
      <div className="flex items-center justify-center my-40">
        {!hasNextPage && <div>No more posts</div>}
        {isLoading && (
          <div className="loading loading-spinner loading-lg text-secondary"></div>
        )}
      </div>
    </div>
  );
};

export default Home;
