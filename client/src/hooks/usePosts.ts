import { useState, useEffect } from "react";
import { findAllPosts } from "../redux/features/posts/postService";
import { PostsResponseType } from "../routes/Home";

const usePosts = (offset = 0) => {
  const [results, setResults] = useState<PostsResponseType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    findAllPosts(offset, { signal })
      .then((data: PostsResponseType[]) => {
        setResults((prev) => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [offset]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;
