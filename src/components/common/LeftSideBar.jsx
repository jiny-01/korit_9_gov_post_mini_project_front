/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom";
import * as s from "./styles";

import { IoHomeOutline, IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { useMeQuery } from "../../queries/usersQueries";
import AddPostModal from "../post/AddPostModal";
import { useEffect, useRef, useState } from "react";
import { RiChatSmileAiLine } from "react-icons/ri";
import OpenaiApiModal from "../openai/OpenaiApiModal";

function LeftSideBar({ children }) {
  const location = useLocation();
  const { pathname } = location;
  const [addPostModalOpen, setAddPostModalOpen] = useState(false);
  const [openaiModalOpen, setOpenaiModalOpen] = useState(false);
  const [homeRefresh, setHomeRefresh] = useState(true);
  const layoutRef = useRef();

  const { isLoading, data } = useMeQuery();

  useEffect(() => {
    if (homeRefresh) {
      setHomeRefresh(false);
    }
  }, [homeRefresh]);

  const handleEscKey = (e) => {
    if (e.key === "Escape" && openaiModalOpen) {
      OpenaiModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [handleEscKey]);

  const handleAddPostModalOpenOnClick = () => {
    setAddPostModalOpen(true);
  };

  const AddPostModalClose = () => {
    setAddPostModalOpen(false);
  };

  const handleOpenaiModalOpenOnClick = () => {
    setOpenaiModalOpen(true);
  };

  const OpenaiModalClose = () => {
    setOpenaiModalOpen(false);
  };

  return (
    <div css={s.sideBarLayout} ref={layoutRef}>
      <aside css={s.sideBarContainer}>
        <h1>Social Board</h1>
        <ul>
          <Link to={"/"}>
            <li css={s.menuListItem(pathname === "/")}>
              <div>
                <IoHomeOutline />
              </div>
              Home
            </li>
          </Link>
          <Link to={"/search"}>
            <li css={s.menuListItem(pathname === "/search")}>
              <div>
                <MdOutlineExplore />
              </div>
              Explore
            </li>
          </Link>
          <Link>
            <li
              css={s.menuListItem(false)}
              onClick={handleAddPostModalOpenOnClick}
            >
              <div>
                <IoAddCircleOutline />
              </div>
              Add a Post
            </li>
          </Link>
          {isLoading || (
            <Link to={"/" + data.data.nickname}>
              <li
                css={s.menuListItem(
                  decodeURI(pathname) === "/" + data.data.nickname
                )}
              >
                <div>
                  <div css={s.profileImg(data.data.imgUrl)}></div>
                </div>
                {data.data.nickname}
              </li>
            </Link>
          )}
        </ul>
        <div>
          <Link to={"/logout"}>Logout</Link>
        </div>
      </aside>
      {!homeRefresh && children}
      {!!layoutRef.current && addPostModalOpen && (
        <AddPostModal
          isOpen={addPostModalOpen}
          onRequestClose={AddPostModalClose}
          layoutRef={layoutRef}
          setHomeRefresh={setHomeRefresh}
        />
      )}
      <div css={s.aiChat} onClick={handleOpenaiModalOpenOnClick}>
        <RiChatSmileAiLine />
      </div>
      <div css={s.aiChatLayout(openaiModalOpen)}>
        <div css={s.aiChatContainer}>
          <OpenaiApiModal />
        </div>
        <button css={s.aiChatClose} onClick={OpenaiModalClose}>닫기</button>
      </div>
    </div>
  );
}

export default LeftSideBar;

//ref : 부모먼저 ref 해줘야함?
//부모 JSX에 ref 먼저 연결 - 자식에서 ref.current 사용 가능
