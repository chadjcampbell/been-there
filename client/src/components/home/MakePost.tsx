import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { MdAddAPhoto } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import { BsSendFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import {
  PostFormData,
  makeNewPost,
} from "../../redux/features/posts/postService";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { SET_POSTS, selectPosts } from "../../redux/features/posts/postSlice";
import { stringToColor } from "../../utils/stringToColor";

export const MakePost = () => {
  const user = useSelector(selectUser);
  const currentPosts = useSelector(selectPosts);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [noLocation, setNoLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialPostValues = { content: "", postPhotoUrl: "" };
  const [post, setPost] = useState(initialPostValues);
  const [postImage, setPostImage] = useState<File | null>(null);
  const pickerRef = useRef<HTMLDetailsElement | null>(null);
  const dispatch = useDispatch();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value;
    setPost({ ...post, [event.target.name]: value });
  };

  const handleEmojiSelect = (event: { native: string }) => {
    const newText = post.content + event.native;
    setPost({ ...post, content: newText });
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
        const maxSizeInBytes = 10240000; // 10MB max file size
        if (fileSize <= maxSizeInBytes) {
          setPostImage(selectedFile);
        } else {
          toast.error("Image size limit is 10MB");
        }
      } else {
        toast.error("Please select an image file.");
      }
    }
  };

  const handlePicButton = () => {
    hiddenFileInput.current?.click();
  };

  const submitPost = async (event: FormEvent) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      // handle image upload to cloudinary
      let imageURL: string = "";
      if (
        postImage &&
        (postImage.type === "image/jpeg" ||
          postImage.type === "image/jpg" ||
          postImage.type === "image/png" ||
          postImage.type === "image/webp")
      ) {
        const image = new FormData();
        image.append("file", postImage);
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

      // get location data and send to backend
      const geoOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const formData: PostFormData = {
              content: post.content,
              postPhotoUrl: imageURL,
              latitude,
              longitude,
            };
            const newPost = await makeNewPost(formData);
            if (newPost) {
              const newPostArray = [newPost, ...currentPosts];
              dispatch(SET_POSTS(newPostArray));
              setPost(initialPostValues);
              setPostImage(null);
              setIsLoading(false);
            }
          },
          async () => {
            // on first attempt, geolocation will end up here if location services were not approved
            if (noLocation == false) {
              setNoLocation(true);
              setIsLoading(false);
            } else {
              const formData: PostFormData = {
                content: post.content,
                postPhotoUrl: imageURL,
              };
              const newPost = await makeNewPost(formData);
              if (newPost) {
                const newPostArray = [newPost, ...currentPosts];
                dispatch(SET_POSTS(newPostArray));
                setPost(initialPostValues);
                setPostImage(null);
                setNoLocation(false);
                setIsLoading(false);
              }
            }
          },
          geoOptions
        );
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="card max-w-[600px] bg-base-100 shadow-xl m-4">
      <div className="card-body">
        <div className="avatar">
          <div className="mr-2 w-20">
            <img
              className={`border-4 rounded-full`}
              style={{ borderColor: stringToColor(user.email) }}
              src={user.photoUrl}
              alt="user profile pic"
            />
          </div>
        </div>
        <h2 className="card-title">Hey, {user.name.split(" ")[0]}</h2>
        {postImage && (
          <div className="flex content-center justify-center max-h-96 aspect-square ">
            <img
              src={URL.createObjectURL(postImage)}
              alt="Post image preview"
              className=" m-4 rounded-xl shadow-sm"
            />
          </div>
        )}
        <form onSubmit={submitPost}>
          <div className="flex items-center">
            <textarea
              required
              value={post.content}
              onChange={handleInputChange}
              name="content"
              placeholder="Where have you been?"
              className="my-4 w-full block border border-primary rounded-lg p-1"
            />
            <details ref={pickerRef} className="dropdown hidden md:block">
              <summary className="m-1 btn">
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
          </div>
          {noLocation ? (
            <p className="flex items-center justify-center font-bold text-red-700 w-80">
              Location services are not enabled, so your post will not render to
              the map. <br />
              Would you still like to post?
            </p>
          ) : null}
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
            <div className="flex">
              {noLocation ? (
                <button
                  onClick={() => setNoLocation(false)}
                  className="badge btn bg-error text-white mr-2"
                >
                  <MdCancel /> Cancel
                </button>
              ) : null}
              <button
                type="submit"
                className="badge btn bg-secondary-focus text-white"
              >
                {isLoading ? (
                  <span className="loading loading-spinner text-white loading-lg"></span>
                ) : (
                  <>
                    <BsSendFill />
                    {noLocation ? "Confirm" : "Post"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakePost;
