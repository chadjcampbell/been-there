import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { PostsResponseType } from "../../routes/Home";

type PostCardProps = {
  post: PostsResponseType;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="card max-w-[600px] bg-base-100 shadow-xl m-4">
      <figure className="flex flex-col">
        <img
          className="max-w-md rounded-xl m-4"
          src={post.posts.post_photo_url}
          alt="User post photo"
        />
        <figcaption>🇫🇷 Paris, France</figcaption>
      </figure>
      <div className="card-body">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={post.user_photo_url} />
          </div>
        </div>
        <h2 className="card-title">{post.user_name}</h2>
        <p>{post.posts.content}</p>
        <div className="card-actions justify-between mt-4">
          <button className="badge btn">
            <AiOutlineHeart />
            {post.posts.likes}
          </button>
          <button className="badge btn btn-secondary">
            <FaRegCommentAlt />
            {post.comment_count}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
