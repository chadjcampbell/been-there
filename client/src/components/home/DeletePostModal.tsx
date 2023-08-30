import { useDispatch, useSelector } from "react-redux";
import {
  SET_POST_ID_DELETE,
  selectPostIdDelete,
} from "../../redux/features/posts/postSlice";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { deletePost } from "../../redux/features/posts/postService";

const DeletePostModal = () => {
  const dispatch = useDispatch();
  const postIdDelete = useSelector(selectPostIdDelete);

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const result = await deletePost({ postId: postIdDelete });
      if (result) {
        toast.success("Post deleted");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      dispatch(SET_POST_ID_DELETE(null));
    }
  };

  return (
    <div className="modal">
      <div className="modal-box flex flex-col">
        <div className="flex flex-column flex-wrap items-center justify-center w-full">
          <h3 className="mb-4 font-bold text-lg">Delete this post?</h3>
          <button className="btn btn-error" onClick={handleDelete}>
            DELETE
          </button>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(SET_POST_ID_DELETE(null))}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
