import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillHeartFill, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { likeComment } from "../../redux/features/posts/postService";
import { CommentType, LikesType } from "../../routes/Home";
import { SET_COMMENT_ID_DELETE } from "../../redux/features/posts/postSlice";
import { stringToColor } from "../../utils/stringToColor";

type CommentCardProps = {
  comment: CommentType;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const user = useSelector(selectUser);
  const [userLiked, setUserLiked] = useState(
    comment?.likes?.filter((like: LikesType) => like.user_id == user.userId)
      .length
  );
  const [numLikes, setNumLikes] = useState(comment?.likes?.length);
  const dispatch = useDispatch();

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

  const handleDeleteButton = () => {
    window.main_modal.showModal();
    dispatch(SET_COMMENT_ID_DELETE([comment.comment_id, comment.post_id]));
  };

  return (
    <div className="card-body">
      <div className="flex justify-start items-center">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="mr-2 w-14">
              <img
                className={`border-4 rounded-full`}
                style={{ borderColor: stringToColor(comment.user.email) }}
                src={comment.user.photo_url}
                alt="friend profile pic"
              />
            </div>
          </div>
          <div className="chat-bubble max-w-full chat-bubble-info bg-gray-100">
            {comment.comment_photo_url && (
              <figure className="flex flex-col ">
                <div className="max-w-md m-4">
                  <img
                    className="rounded-xl object-contain"
                    src={comment.comment_photo_url}
                    alt="User comment photo"
                  />
                </div>
              </figure>
            )}
            {comment.content}
          </div>
          <div className="chat-footer flex mt-2">
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
            {user.userId === comment.user_id && (
              <button
                onClick={handleDeleteButton}
                className="btn btn-sm ml-2 mb-2 btn-error"
              >
                <BsTrash size="12" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
