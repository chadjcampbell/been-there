import { BsTrash } from "react-icons/bs";
import { PostsResponseType } from "../../routes/Home";
import { useDispatch } from "react-redux";
import { SET_POST_ID_DELETE } from "../../redux/features/posts/postSlice";

type DeletePostModalProps = {
  post: PostsResponseType;
};
const DeletePostButton = ({ post }: DeletePostModalProps) => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="btn btn-error mb-4"
        onClick={() => dispatch(SET_POST_ID_DELETE(post.post_id))}
      >
        <BsTrash />
      </button>
    </>
  );
};

export default DeletePostButton;
