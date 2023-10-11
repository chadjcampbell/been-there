import MakePost from "../components/home/MakePost";
import PostCard from "../components/home/PostCard";
import { FriendType } from "./Friends";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_OFFSET,
  SET_POSTS,
  selectOffset,
  selectPosts,
} from "../redux/features/posts/postSlice";
import { useEffect, useRef } from "react";
import { findAllPosts } from "../redux/features/posts/postService";

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
  const posts: PostsResponseType[] | [] = useSelector(selectPosts);
  const dispatch = useDispatch();
  const offset = useSelector(selectOffset);
  const bottom = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setPosts = async () => {
      try {
        const postsData = await findAllPosts(offset);
        dispatch(SET_POSTS(postsData));
      } catch (err) {
        console.log(err);
      } finally {
      }
    };
    setPosts();
  }, []);

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      async function fetchMorePosts() {
        console.log(offset);
        const newPosts: PostsResponseType[] = await findAllPosts(offset + 5);
        dispatch(SET_OFFSET(offset + 5));
        const allPosts = [...posts, ...newPosts];
        console.log(allPosts);
        dispatch(SET_POSTS(allPosts));
        if (newPosts.length < 5) {
          bottom.current && observer.unobserve(bottom.current);
        }
      }
      fetchMorePosts();
    }
  });

  if (bottom.current) {
    observer.observe(bottom.current);
  }

  return (
    <div>
      <section>
        <MakePost />
      </section>
      <section>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.post_id} post={post} />)
        ) : (
          <h2 className="card-title flex justify-center items-center mt-16">
            No posts yet, where have you been?
          </h2>
        )}
      </section>
      <div className="flex items-center justify-center my-40">
        <div
          ref={bottom}
          className="loading loading-spinner loading-lg text-secondary"
        ></div>
      </div>
    </div>
  );
};

export default Home;
