import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { LikesType, PostsResponseType } from "../../routes/Home";
import { likePost } from "../../redux/features/posts/postService";
import { useState } from "react";
import { motion, spring } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";

type PostCardProps = {
  post: PostsResponseType;
};

export const PostCard = ({ post }: PostCardProps) => {
  const user = useSelector(selectUser);
  const [userLiked, setUserLiked] = useState(
    post.likes.filter((like: LikesType) => like.user_id == user.userId).length
  );
  const [numLikes, setNumLikes] = useState(post.likes.length);

  const userLocInfo = () => {
    if (post.user_location.region && post.user_location.country) {
      const flag = getFlagEmoji(post.user_location.country);
      return `${flag} ${post.user_location.region}, ${post.user_location.country}`;
    } else {
      return "💀 Kno, Where";
    }
  };

  const getFlagEmoji = (countryCode: string) => {
    return [...countryCode.toUpperCase()]
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt()))
      .reduce((a, b) => `${a}${b}`);
  };

  const likeThisPost = async () => {
    try {
      const result = await likePost({ postId: post.post_id });
      if (result) {
        setUserLiked(1);
        setNumLikes((prev) => prev + 1);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="card max-w-[90vw] bg-base-100 shadow-xl m-4">
      <figure className="flex flex-col ">
        <div className="max-w-md m-4">
          <img
            className="rounded-xl object-contain"
            src={post.post_photo_url}
            alt="User post photo"
          />
        </div>
        <figcaption>{userLocInfo()}</figcaption>
      </figure>
      <div className="card-body">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={post.user.photo_url} />
          </div>
        </div>
        <h2 className="card-title">{post.user.name}</h2>
        <p>{post.content}</p>
        <div className="card-actions justify-between mt-4">
          <motion.button onClick={likeThisPost} className="badge btn">
            {userLiked ? (
              <motion.div transition={spring} animate={{ scale: [0, 2, 1.2] }}>
                <BsFillHeartFill size="20" color="red" />
              </motion.div>
            ) : (
              <AiOutlineHeart />
            )}
            {numLikes}
          </motion.button>
          <button className="badge btn btn-secondary">
            <FaRegCommentAlt />
            {post.comments.length}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
