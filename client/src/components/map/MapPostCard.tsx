import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { LikesType, PostsResponseType } from "../../routes/Home";
import { likePost } from "../../redux/features/posts/postService";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";

type PostCardProps = {
  post: PostsResponseType;
};

export const MapPostCard = ({ post }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const user = useSelector(selectUser);
  const [userLiked, setUserLiked] = useState(
    post.likes.filter((like: LikesType) => like.user_id == user.userId).length
  );
  const [numLikes, setNumLikes] = useState(post.likes.length);

  const userLocInfo = () => {
    if (
      post.user_location.city &&
      post.user_location.state &&
      post.user_location.country
    ) {
      const flag = getFlagEmoji(post.user_location.country);
      return `${flag} ${post.user_location.city}, ${post.user_location.state}, ${post.user_location.country}`;
    } else {
      return "💀 Kno, Where";
    }
  };

  const getFlagEmoji = (countryCode: string) => {
    return [...countryCode.toUpperCase()]
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join("");
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
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="card bg-base-100"
    >
      {post.post_photo_url && (
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
      )}
      <div className="card-body">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={post.user.photo_url} />
          </div>
        </div>
        <h2 className="card-title">{post.user.name}</h2>
        <p className="text-[16px]">{post.content}</p>
        {!post.post_photo_url && <p>{userLocInfo()}</p>}
        <div className="card-actions justify-between mt-4">
          <button onClick={likeThisPost} className="badge btn">
            {userLiked ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1.2 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 1.5,
                }}
              >
                <BsFillHeartFill size="18" color="red" />
              </motion.div>
            ) : (
              <AiOutlineHeart />
            )}
            {numLikes}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MapPostCard;
