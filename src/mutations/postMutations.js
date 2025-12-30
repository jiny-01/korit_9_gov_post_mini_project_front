import { useMutation } from "@tanstack/react-query";
import { createPost } from "../apis/posts/postsApi";
import { createComments } from "../apis/posts/commentsApi";

export const useCreatePostMutation = () =>
  useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data) => {
      return await createPost(data);
    },
  });

export const useCreatePostCommentMutation = () => useMutation({
    mutationKey: ["createPostComment"],
    mutationFn: async ({postId, data}) => {
        return await createComments(postId, data);
    }
});


//query: get요청
//mutation: post, put, delete - 원할 때 요청날림
