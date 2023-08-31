import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { likeComment } from "../../redux/features/posts/postService";
import { CommentType, LikesType } from "../../routes/Home";

type CommentCardProps = {
  comment: CommentType;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const user = useSelector(selectUser);
  const [userLiked, setUserLiked] = useState(
    comment.likes.filter((like: LikesType) => like.user_id == user.userId)
      .length
  );
  const [numLikes, setNumLikes] = useState(comment.likes.length);

  const likeThisComment = async () => {
    try {
      const result = await likeComment({ commentId: comment.comment_id });
      if (result) {
        setUserLiked(1);
        setNumLikes((prev) => prev + 1);
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  console.log(comment);

  return (
    <div className="card-body">
      <div className="flex justify-center items-center">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={comment.user.photo_url} alt="friends profile pic" />
            </div>
          </div>
          <div className="chat-bubble max-w-full chat-bubble-info bg-gray-100">
            {comment.content}
          </div>
        </div>
        <button onClick={likeThisComment} className="btn btn-sm ml-2">
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
              <BsFillHeartFill size="12" color="red" />
            </motion.div>
          ) : (
            <AiOutlineHeart />
          )}
          {numLikes}
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
