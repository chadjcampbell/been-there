import MakePost from "../components/home/MakePost";
import PostCard from "../components/home/PostCard";
import { FriendType } from "./Friends";
import { useDispatch, useSelector } from "react-redux";
import { SET_POSTS, selectPosts } from "../redux/features/posts/postSlice";
import { useEffect, useRef, useState } from "react";
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
  const offsetRef = useRef(0);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const [endOfPosts, setEndOfPosts] = useState(false);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const postsData = await findAllPosts(0);
        dispatch(SET_POSTS(postsData));
      } catch (err) {
        console.log(err);
      }
    };
    fetchInitialPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          async function fetchMorePosts() {
            const newOffset = offsetRef.current + 5;
            offsetRef.current = newOffset;
            const newPosts: PostsResponseType[] = await findAllPosts(newOffset);
            if (newPosts.length) {
              dispatch(SET_POSTS(newPosts));
            } else {
              if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
                setEndOfPosts(true);
              }
            }
          }
          fetchMorePosts();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

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
        {endOfPosts ? (
          <div>No more posts</div>
        ) : (
          <div
            ref={observerTarget}
            className="loading loading-spinner loading-lg text-secondary"
          ></div>
        )}
      </div>
    </div>
  );
};

export default Home;
