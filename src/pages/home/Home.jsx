/** @jsxImportSource @emotion/react */
import Slider from "react-slick";
import Loading from "../../components/common/Loading";
import { useGetFeeds } from "../../queries/postQueries";
import * as s from "./styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import { FadeLoader } from "react-spinners";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import Comment from "../../components/comment/Comment";

function Home() {
  const [commentOpen, setCommentOpen] = useState(0);
  const { isLoading, isFetching, isPending, data, hasNextPage, fetchNextPage } =
    useGetFeeds();
  const loadMoreRef = useRef();
  console.log(isFetching);
  console.log("isLoading:", isLoading);
  console.log(isPending);
  console.log("data:", data);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [obs] = entries;
        if (obs.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);
  }, [hasNextPage]);

  const handleCommentOnClick = (postId) => {
    const currentPostId = commentOpen;
    setCommentOpen(currentPostId === postId ? 0 : postId);
  };

  return (
    <div css={s.layout}>
      <div css={s.feedContainer(commentOpen)}>
        {(isLoading && <Loading />) ||
          data.pages.map((feeds) =>
            feeds.data.contents.map((feed) => (
              <div key={feed.postId} css={s.feedItemContainer}>
                <header>
                  <div css={s.profileImage(feed.user?.imgUrl)}></div>
                  <div css={s.userInfo}>
                    <div>{feed.user?.nickname}</div>
                    <div>{feed.createdAt}</div>
                  </div>
                </header>
                <main>
                  {feed.imageFiles && (
                    <div css={s.feedImageContainer}>
                      <Slider
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                      >
                        {feed.imageFiles.map((file) => (
                          <div
                            css={s.feedImage(
                              "http://localhost:8080/image" + file.filePath
                            )}
                          ></div>
                        ))}
                      </Slider>
                    </div>
                  )}
                  <div css={s.feedContentContainer}>{feed.content}</div>
                </main>
                <footer>
                  <div>{false ? <IoMdHeart /> : <IoMdHeartEmpty />}</div>
                  <div onClick={() => handleCommentOnClick(feed.postId)}>
                    <IoChatbubbleOutline />
                  </div>
                </footer>
              </div>
            ))
          )}
        <div ref={loadMoreRef} style={{ padding: "10px 0" }}>
          {isFetching && !isLoading && <FadeLoader />}
        </div>
      </div>
      {commentOpen && (
        <div css={s.commentContainer(commentOpen)}>
          {
              !!commentOpen && 
              <Comment postId={commentOpen} />
          }
        </div>
      )}

      <div css={s.followInfoContainer}></div>
    </div>
  );
}

export default Home;
