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

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const data = await findAllPosts(offset);
        if (!signal.aborted) {
          setResults((prev) => [...prev, ...data]);
          setHasNextPage(Boolean(data.length));
          setIsLoading(false);
        }
      } catch (e: any) {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      }
    };

    fetchData();

    return () => controller.abort();
  }, [offset]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;
