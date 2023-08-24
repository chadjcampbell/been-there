import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { MdAddAPhoto } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";

export const MakePost = () => {
  const user = useSelector(selectUser);
  return (
    <div className="card max-w-[600px] bg-base-100 shadow-xl m-4">
      <div className="card-body">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={user.photoUrl} />
          </div>
        </div>
        <h2 className="card-title">Hey, {user.name.split(" ")[0]}</h2>
        <form>
          <textarea
            placeholder="Where have you been?"
            className="my-4 w-full block border border-primary rounded-lg p-1"
          />
          <div className="card-actions justify-between mt-4">
            <button type="button" className="badge btn">
              <MdAddAPhoto size="1.5rem" title="Add Picture to post" />
            </button>
            <button type="submit" className="badge btn btn-secondary">
              <BsSendFill />
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakePost;
