import { useQuery } from "@tanstack/react-query";
import { getComments } from "../apis/posts/commentsApi";

export const useGetCommentQuery = (postId) =>
  useQuery({
    queryKey: ["getComments", postId],
    queryFn: async () => await getComments(postId),
  });
