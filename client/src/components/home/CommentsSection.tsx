import { PostsResponseType } from "../../routes/Home";
import CommentCard from "./CommentCard";
import MakeComment from "./MakeComment";

type CommentsSectionProps = {
  post: PostsResponseType;
};

const CommentsSection = ({ post }: CommentsSectionProps) => {
  return (
    <div className="card max-w-[480px] bg-base-100 shadow-xl mb-4 mx-8">
      <MakeComment post={post} />
      {post.comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsSection;
