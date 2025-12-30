import { BiSend } from "react-icons/bi";
import * as s from "./styles";
import { useState } from "react";
import { useCreatePostCommentMutation } from "../../mutations/postMutations";
import { useGetCommentQuery } from "../../queries/commentQueries";
/** @jsxImportSource @emotion/react */

function Comment({ postId }) {
  const [inputValue, setInputValue] = useState("");
  const [recomment, setRecomment] = useState({
    parentCommentId: 0,
    parentUserId: 0,
  });
  const commentMutation = useCreatePostCommentMutation();
  const { isLoading, data, refetch } = useGetCommentQuery(postId);

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = async () => {
    const data = {
      ...recomment,
      content: inputValue,
    };
    await commentMutation.mutateAsync({ postId, data }); //호출해야 post 요청날라감
    await refetch();
    setInputValue("");
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOnSubmit();
    }
  };

  const handleRecommentOnClick = (commentId, userId) => {
    setRecomment({
      parentCommentId: commentId,
      parentUserId: userId,
    });
  };

  console.log("현재 postId:", postId);

  return (
    <div css={s.layout}>
      <h2>댓글</h2>
      <div css={s.commentItemList}>
        {!isLoading &&
          data.data.map((comment) => (
            <div
              key={comment.commentId}
              css={s.commentItem(
                comment.level,
                comment.commentId === recomment.parentCommentId
              )}
            >
              <div>
                <div css={s.commentProfileImage(comment.imgUrl)}></div>
                <div>{comment.nickname}</div>
              </div>
              <div>
                <span>
                  {!!comment.parentNickname && "@" + comment.parentNickname}
                </span>{" "}
                {comment.content}
              </div>
              <div>
                {new Date(comment.createdAt).toLocaleString()}{" "}
                {
                    !comment.parentCommentId && (
                        comment.commentId === recomment.parentCommentId ? (
                    <span onClick={() => handleRecommentOnClick(0, 0)}>
                        답글취소
                    </span>
                    ) : (
                    <span
                        onClick={() =>
                        handleRecommentOnClick(comment.commentId, comment.userId)
                        }
                    >
                        답글달기
                    </span>)
                )}
              </div>
            </div>
          ))}
      </div>
      <div>
        <div css={s.commentInput}>
          <input
            type="text"
            placeholder="댓글을 입력하세요."
            value={inputValue}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          />
          <BiSend onClick={handleOnSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Comment;
