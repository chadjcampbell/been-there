import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import {
  userUpdateData,
  updateUser,
} from "../../redux/features/auth/authService";
import { SET_USER, UserType } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

type ProfileEditProps = {
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
};

export const ProfileEdit = ({ user, setUpdateMode }: ProfileEditProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(user);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const dispatch = useDispatch();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value;
    setProfile({ ...profile, [event.target.name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      if (selectedFile.type.startsWith("image/")) {
        const fileSize = selectedFile.size;
        const maxSizeInBytes = 5120 * 5120; // 1MB max file size
        if (fileSize <= maxSizeInBytes) {
          setProfileImage(selectedFile);
        } else {
          toast.error("Image size limit is 5MB");
        }
      } else {
        toast.error("Please select an image file.");
      }
    }
  };

  const saveProfile = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // handle image upload to cloudinary
      let imageURL: string = "";
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png" ||
          profileImage.type === "image/webp")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
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
      // set photo
      const newPhoto = imageURL !== "" ? imageURL : user.photoUrl;

      // send all data to backend
      const formData: userUpdateData = {
        name: profile.name,
        bio: profile.bio,
        photo: newPhoto,
      };
      const data = await updateUser(formData);
      dispatch(SET_USER(data));
      toast.success("User updated successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setUpdateMode(false);
    }
  };

  return isLoading ? (
    <span className="loading loading-spinner text-secondary loading-lg"></span>
  ) : (
    <div className="card-body flex-col lg:flex-row">
      <div className="flex content-center justify-center max-h-96 aspect-square ">
        <img
          src={profileImage ? URL.createObjectURL(profileImage) : user.photoUrl}
          alt={user.name}
          className=" m-6 p-2 rounded-full shadow-sm"
        />
      </div>
      <form onSubmit={saveProfile}>
        <input
          value={profile.name}
          name="name"
          onChange={handleInputChange}
          className="text-2xl font-bold w-full border border-primary rounded-lg p-1"
        />
        <div className="my-3 border border-primary rounded-lg p-1">
          <p className="font-bold">Profile Picture</p>
          <p className="my-1 text-xs">
            Supported formats: jpg, jpeg, png, webp
          </p>
          <input name="image" onChange={handleImageChange} type="file" />
        </div>
        <textarea
          value={profile.bio}
          name="bio"
          onChange={handleInputChange}
          className="my-4 w-full block border border-primary rounded-lg p-1"
        />
        <button type="submit" className="btn btn-secondary">
          Save Changes
        </button>
        <button
          onClick={() => setUpdateMode(false)}
          type="button"
          className="ml-4 btn btn-error"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
