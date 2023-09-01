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
import {
  SET_FRIENDS_LIST,
  SET_FRIEND_ID_DELETE,
  selectFriendIdDelete,
  selectFriendsList,
} from "../../redux/features/friends/friendsSlice";
import { deleteFriend } from "../../redux/features/friends/friendService";
import { FriendType } from "../../routes/Friends";

declare global {
  interface Window {
    main_modal: HTMLDialogElement;
  }
}

const DeleteModal = () => {
  const dispatch = useDispatch();
  const postIdDelete = useSelector(selectPostIdDelete);
  const friendIdDelete = useSelector(selectFriendIdDelete);
  const posts = useSelector(selectPosts);
  const friends = useSelector(selectFriendsList);

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
    if (postIdDelete) {
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
        window.main_modal.close();
      }
    }
    if (friendIdDelete) {
      try {
        const result = await deleteFriend(friendIdDelete);
        if (result) {
          toast.success("Friend deleted");
          const newFriends = friends.filter(
            (friend: FriendType) => friend.user_id != friendIdDelete
          );
          dispatch(SET_FRIENDS_LIST(newFriends));
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        dispatch(SET_FRIEND_ID_DELETE(null));
        window.main_modal.close();
      }
    }
  };

  const handleCancel = () => {
    window.main_modal.close();
    dispatch(SET_POST_ID_DELETE(null));
    dispatch(SET_FRIEND_ID_DELETE(null));
  };

  return (
    <dialog id="main_modal" className="modal">
      <form
        method="dialog"
        className="modal-box flex flex-col justify-center items-center"
      >
        <h3 className="mb-4 font-bold text-lg">Are you sure?</h3>
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

export default DeleteModal;
