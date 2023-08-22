import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import {
  userUpdateData,
  updateUser,
} from "../../redux/features/auth/authService";
import { UserType } from "../../redux/features/auth/authSlice";

type ProfileEditProps = {
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
};

export const ProfileEdit = ({ user, setUpdateMode }: ProfileEditProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(user);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setProfile({ ...profile, [event.target.name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0]);
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
        imageURL = imageData.url.toString();
      }

      // set photo
      const newPhoto = imageURL !== "" ? imageURL : profile.photo;

      // send all data to mongoDB
      const formData: userUpdateData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: newPhoto,
      };
      const data = await updateUser(formData);
      console.log(data);
      toast.success("User updated successfully");
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return isLoading ? (
    <span className="loading loading-spinner text-secondary loading-lg"></span>
  ) : (
    <form>
      <h1 className="text-5xl font-bold">{user.name}</h1>
      <p className="py-6 text-xs">
        Member since: {new Date(user.registrationDate).toLocaleDateString()}
      </p>
      <p className="py-6">{user.bio}</p>
      <button
        onClick={() => setUpdateMode(false)}
        className="btn btn-secondary"
      >
        Save Changes
      </button>
    </form>
  );
};
