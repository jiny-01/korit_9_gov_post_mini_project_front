import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeeds } from "../apis/posts/postsApi";

export const useGetFeeds = () =>
  useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: async ({ pageParam = 1 }) =>
      await getFeeds({ currentPage: pageParam, size: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = lastPage.data.currentPage;
      const totalPages = lastPage.data.totalPage;
      console.log(lastPage);
      console.log(allPages);
      return lastPage.data.isLast ? undefined : currentPage + 1;
    }
  });
