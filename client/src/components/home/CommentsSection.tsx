import { PostsResponseType } from "../../routes/Home";
import CommentCard from "./CommentCard";
import MakeComment from "./MakeComment";

type CommentsSectionProps = {
  post: PostsResponseType;
};

const CommentsSection = ({ post }: CommentsSectionProps) => {
  return (
    <div>
      <MakeComment post={post} />
      {post.comments.map((comment) => (
        <CommentCard comment={comment} />
      ))}
    </div>
  );
};

export default CommentsSection;
