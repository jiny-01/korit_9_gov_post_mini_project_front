import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  height: 100%;
`;

export const feedContainer = (commentOpen) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  overflow-y: ${commentOpen ? "hidden" : "auto"};
  /* overflow: hidden - 스크롤 막는 행위 */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const followInfoContainer = css`
  box-sizing: border-box;
  margin-top: 20px;
  padding-left: 20px;
  width: 35%;
`;

export const feedItemContainer = css`
  margin-top: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px;
  width: 400px;
  background-color: #ffffff;
  box-shadow: 0 0 10px #00000066;

  & > header {
    display: flex;
    height: 40px;
  }

  & > main {
    padding: 10px 0;
  }

  & > footer {
    display: flex;
    gap: 5px;
    box-sizing: border-box;
    border-top: 1px solid #dbdbdb;
    padding: 5px;

    & > div {
      display: flex;
      cursor: pointer;
      align-items: center;
    }

    & > div:nth-of-type(1) {
      font-size: 24px;
    }

    & > div:nth-of-type(2) {
      font-size: 21px;
    }
  }
`;

export const profileImage = (url) => css`
  margin-right: 10px;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-image: url(${url});
  background-position: center;
  background-size: cover;
`;

export const userInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  & > div:nth-of-type(1) {
    font-size: 14px;
    font-weight: 500;
    color: #222222;
  }

  & > div:nth-of-type(2) {
    font-size: 10px;
    color: #888888;
  }
`;

export const feedImageContainer = css`
  & .slick-prev {
    left: 25px;
    z-index: 2;
    &::before {
      color: black;
    }
  }

  & .slick-next {
    right: 25px;
    z-index: 2;
    &::before {
      color: black;
    }
  }
`;

export const feedImage = (url) => css`
  width: 100%;
  height: 380px;
  background-image: url(${url});
  background-position: center;
  background-size: cover;
`;

export const feedContentContainer = css`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 14px;
  color: #222222;
`;

export const commentContainer = (commentOpen) => css`
  position: absolute;
  right: 20px;
  margin-top: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  width: 260px;
  height: 490px;
  box-shadow: 0 0 10px #00000066;
  background-color: #ffffff;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  opacity: ${commentOpen ? 1 : 0};
`;
