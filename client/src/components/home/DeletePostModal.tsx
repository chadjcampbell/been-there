import { useDispatch, useSelector } from "react-redux";
import {
  SET_POSTS,
  SET_POST_ID_DELETE,
  selectPostIdDelete,
  selectPosts,
} from "../../redux/features/posts/postSlice";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { deletePost } from "../../redux/features/posts/postService";
import { PostsResponseType } from "../../routes/Home";

declare global {
  interface Window {
    delete_post_modal: HTMLDialogElement;
  }
}

const DeletePostModal = () => {
  const dispatch = useDispatch();
  const postIdDelete = useSelector(selectPostIdDelete);
  const posts = useSelector(selectPosts);

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const result = await deletePost({ postId: postIdDelete });
      if (result) {
        toast.success("Post deleted");
        const newPosts = posts.filter(
          (post: PostsResponseType) => post.post_id != postIdDelete
        );
        dispatch(SET_POSTS(newPosts));
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      dispatch(SET_POST_ID_DELETE(null));
      window.delete_post_modal.close();
    }
  };

  const handleCancel = () => {
    window.delete_post_modal.close();
    dispatch(SET_POST_ID_DELETE(null));
  };

  return (
    <dialog id="delete_post_modal" className="modal">
      <form
        method="dialog"
        className="modal-box flex flex-col justify-center items-center"
      >
        <h3 className="mb-4 font-bold text-lg">Delete this post?</h3>
        <div className="">
          <button className="btn btn-error" onClick={handleDelete}>
            DELETE
          </button>
          <button className="btn btn-primary ml-4" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleCancel}>close</button>
      </form>
    </dialog>
  );
};

export default DeletePostModal;
