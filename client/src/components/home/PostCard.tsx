import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { PostType } from "../../routes/Home";

type PostCardProps = {
  post: PostType;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="card max-w-[600px] bg-base-100 shadow-xl m-4">
      <figure className="flex flex-col">
        <img
          className="max-w-md rounded-xl m-4"
          src={post.post_photo_url}
          alt="User post photo"
        />
        <figcaption>🇫🇷 Paris, France</figcaption>
      </figure>
      <div className="card-body">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={post.user_id.photo_url} />
          </div>
        </div>
        <h2 className="card-title">{post.user_id.name}</h2>
        <p>{post.content}</p>
        <div className="card-actions justify-between mt-4">
          <div className="badge btn">
            <AiOutlineHeart />
            13
          </div>
          <div className="badge btn btn-secondary">
            <FaRegCommentAlt />
            11 Comments
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
