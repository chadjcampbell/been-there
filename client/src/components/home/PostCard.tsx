import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { LikesType, PostsResponseType } from "../../routes/Home";
import { likePost } from "../../redux/features/posts/postService";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import DeletePostButton from "./DeletePostButton";
import CommentsSection from "./CommentsSection";
import ImageWrapper from "../global/ImageWrapper";
import { stringToColor } from "../../utils/stringToColor";
import { Link } from "react-router-dom";
import { AdvancedImage, responsive } from "@cloudinary/react";
import { getCloudinaryImage } from "../../utils/cloudinary";

type PostCardProps = {
  post: PostsResponseType;
};

export const PostCard = ({ post }: PostCardProps) => {
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
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="card max-w-[90vw] bg-base-100 shadow-xl mt-4 mx-4 z-10"
      >
        {post.post_photo_url && (
          <figure className="flex flex-col ">
            <div className="max-w-md m-4">
              <ImageWrapper>
                <AdvancedImage
                  className="rounded-xl object-contain w-full"
                  width="640"
                  height="360"
                  cldImg={getCloudinaryImage(post.post_photo_url)}
                  alt="User post photo"
                  plugins={[responsive({ steps: 200 })]}
                />
              </ImageWrapper>
            </div>
            <figcaption>{userLocInfo()}</figcaption>
          </figure>
        )}
        <div className="card-body">
          <Link to={`/profile/${post.user_id}`}>
            <div className="avatar">
              <div className="mr-2 w-20">
                <AdvancedImage
                  className="border-4 rounded-full"
                  style={{ borderColor: stringToColor(post.user.email) }}
                  cldImg={getCloudinaryImage(post.user.photo_url)}
                  alt="friend profile pic"
                  plugins={[responsive({ steps: 200 })]}
                />
              </div>
            </div>
            <h2 className="card-title">{post.user.name}</h2>
          </Link>
          <p>{post.content}</p>
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
            <div className="flex">
              {post.user_id == user.userId && <DeletePostButton post={post} />}
              <button
                onClick={() => {
                  setShowComments(!showComments);
                }}
                className="badge btn btn-secondary ml-4"
              >
                <FaRegCommentAlt />
                {post.comments.length}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {showComments && (
        <motion.div
          initial={{ y: -300, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: "linear",
            duration: 0.5,
          }}
        >
          <CommentsSection post={post} />
        </motion.div>
      )}
    </>
  );
};

export default PostCard;
