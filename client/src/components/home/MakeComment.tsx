import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { MdAddAPhoto } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import { BsSendFill } from "react-icons/bs";
import {
  PostFormData,
  makeNewPost,
} from "../../redux/features/posts/postService";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { SET_POSTS, selectPosts } from "../../redux/features/posts/postSlice";
import { PostsResponseType } from "../../routes/Home";

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
      setCommentImage(event.target.files[0]);
    }
  };

  const handlePicButton = () => {
    hiddenFileInput.current?.click();
  };

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
        imageURL = imageData.url.toString();
      }

      // send all data to backend
      const formData: PostFormData = {
        content: post.content,
        postPhotoUrl: imageURL,
      };

      // TODO - makeComment logic here
      //const newComment = await makeComment(formData);
      //const newPostArray = [newPost, ...currentPosts];
      //dispatch(SET_POSTS(newPostArray));

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
    <div className="card max-w-[600px] bg-base-100 shadow-xl m-4">
      <div className="card-body">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={user.photoUrl} />
          </div>
        </div>
        <h2 className="card-title">Hey, {user.name.split(" ")[0]}</h2>
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
            <textarea
              required
              value={comment.content}
              onChange={handleInputChange}
              name="content"
              placeholder="Where have you been?"
              className="my-4 w-full block border border-primary rounded-lg p-1"
            />
            <details ref={pickerRef} className="dropdown hidden md:block">
              <summary className="m-1 btn">
                <GoSmiley />
              </summary>
              <div className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <Picker
                  onClickOutside={closeEmojiPicker}
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                />
              </div>
            </details>
          </div>

          <div className="card-actions justify-between mt-4">
            <input
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              className="hidden" // Make the file input element invisible, because it's ugly
            />
            <button
              onClick={handlePicButton}
              type="button"
              className="badge btn"
            >
              <MdAddAPhoto size="1.5rem" title="Add Picture to post" />
            </button>
            <button type="submit" className="badge btn btn-secondary">
              {isLoading ? (
                <span className="loading loading-spinner text-white loading-lg"></span>
              ) : (
                <>
                  <BsSendFill />
                  Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeComment;
