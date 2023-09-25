import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { MdAddAPhoto } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import { BsSendFill } from "react-icons/bs";
import {
  CommentFormData,
  makeNewComment,
} from "../../redux/features/posts/postService";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { SET_POSTS, selectPosts } from "../../redux/features/posts/postSlice";
import { CommentType, PostsResponseType } from "../../routes/Home";
import { stringToColor } from "../../utils/stringToColor";

type MakeCommentProps = {
  post: PostsResponseType;
};

export const MakeComment = ({ post }: MakeCommentProps) => {
  const user = useSelector(selectUser);
  const currentPosts = useSelector(selectPosts);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const initialPostValues = { content: "", commentPhotoUrl: "" };
  const [comment, setComment] = useState(initialPostValues);
  const [commentImage, setCommentImage] = useState<File | null>(null);
  const pickerRef = useRef<HTMLDetailsElement | null>(null);
  const dispatch = useDispatch();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value;
    setComment({ ...comment, [event.target.name]: value });
  };

  const handleEmojiSelect = (event: { native: string }) => {
    const newText = comment.content + event.native;
    setComment({ ...comment, content: newText });
  };

  const closeEmojiPicker = () => {
    if (pickerRef.current) {
      pickerRef.current.open = false;
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      if (selectedFile.type.startsWith("image/")) {
        const fileSize = selectedFile.size;
        const maxSizeInBytes = 5120 * 5120; // 1MB max file size
        if (fileSize <= maxSizeInBytes) {
          setCommentImage(selectedFile);
        } else {
          toast.error("Image size limit is 5MB");
        }
      } else {
        toast.error("Please select an image file.");
      }
    }
  };

  const handlePicButton = () => {
    hiddenFileInput.current?.click();
  };

  function updatePostComments(
    postsArray: PostsResponseType[],
    postId: number,
    newComment: CommentType
  ) {
    // Find the index of the post with the specified post_id
    const postIndex = postsArray.findIndex((post) => post.post_id === postId);

    // If post_index is found, update its comments array
    if (postIndex !== -1) {
      const updatedPost = {
        ...postsArray[postIndex],
        comments: [...postsArray[postIndex].comments, newComment],
      };

      // Create a new array with the updated post and other posts unchanged
      const updatedPostsArray = [
        ...postsArray.slice(0, postIndex),
        updatedPost,
        ...postsArray.slice(postIndex + 1),
      ];

      return updatedPostsArray;
    }

    return postsArray; // If post_id is not found, return the original array
  }

  const submitPost = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // handle image upload to cloudinary
      let imageURL: string = "";
      if (
        commentImage &&
        (commentImage.type === "image/jpeg" ||
          commentImage.type === "image/jpg" ||
          commentImage.type === "image/png" ||
          commentImage.type === "image/webp")
      ) {
        const image = new FormData();
        image.append("file", commentImage);
        image.append("cloud_name", "duu3fdfk0");
        image.append("upload_preset", "zx0zcbpv");

        // save to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/duu3fdfk0/image/upload",
          { method: "post", body: image }
        );
        const imageData = await response.json();
        imageURL = imageData.secure_url.toString();
      }

      // send all data to backend
      const formData: CommentFormData = {
        postId: post.post_id,
        content: comment.content,
        commentPhotoUrl: imageURL,
      };

      const newComment = await makeNewComment(formData);
      const newPostArray = updatePostComments(
        currentPosts,
        post.post_id,
        newComment
      );
      dispatch(SET_POSTS(newPostArray));
      setComment(initialPostValues);
      setCommentImage(null);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="card-body">
        {commentImage && (
          <div className="flex content-center justify-center max-h-96 aspect-square ">
            <img
              src={URL.createObjectURL(commentImage)}
              alt="Post image preview"
              className=" m-4 rounded-xl shadow-sm"
            />
          </div>
        )}
        <form onSubmit={submitPost}>
          <div className="flex items-center">
            <div className="chat-image avatar">
              <div className="mr-2 w-14">
                <img
                  className={`border-4 rounded-full`}
                  style={{ borderColor: stringToColor(user.email) }}
                  src={user.photoUrl}
                  alt="friend profile pic"
                />
              </div>
            </div>
            <textarea
              required
              value={comment.content}
              onChange={handleInputChange}
              name="content"
              placeholder="Make a comment..."
              className="my-2 w-full block border border-primary rounded-lg p-1"
            />
          </div>

          <div className="card-actions justify-end items-center">
            <input
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              className="hidden" // Make the file input element invisible, because it's ugly
            />
            <button
              onClick={handlePicButton}
              type="button"
              className="badge btn btn-sm"
            >
              <MdAddAPhoto size="1.5rem" title="Add Picture to post" />
            </button>
            <details ref={pickerRef} className="dropdown hidden md:block">
              <summary className="m-1 btn btn-sm">
                <GoSmiley />
              </summary>
              <div className="p-2 shadow menu dropdown-content z-[998] bg-base-100 rounded-box w-52">
                <Picker
                  onClickOutside={closeEmojiPicker}
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                />
              </div>
            </details>
            <button type="submit" className="badge btn btn-secondary btn-sm">
              {isLoading ? (
                <span className="loading loading-spinner text-white loading-lg"></span>
              ) : (
                <BsSendFill />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeComment;
