import { useState, useEffect } from "react";
import { findAllPosts } from "../redux/features/posts/postService";
import { PostsResponseType } from "../routes/Home";

const usePosts = (offset = 0) => {
  const [results, setResults] = useState<PostsResponseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>({});
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    findAllPosts(offset)
      .then((data: PostsResponseType[]) => {
        setResults((prev) => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setIsError(true);
        setError({ message: e.message });
      });
  }, [offset]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;
