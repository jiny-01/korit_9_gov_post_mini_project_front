import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const frame = css`
  display: flex;
  box-sizing: border-box;
  border: 3px solid #747474;
  border-radius: 30px;
  padding: 30px;
  width: 1000px;
  height: 650px;
  background-color: #000000;
`;

export const frameContainer = css`
  position: relative;
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-color: #f3f5f7;
  overflow: hidden;
`;

/////////////////////<<Loading>>/////////////////////
export const loadingBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000066;
`;

/////////////////////<<LeftSideBar>>/////////////////////

export const sideBarLayout = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const sideBarContainer = css`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width: 200px;
  height: 100%;
  background-color: #ffffff;

  & > h1 {
    margin: 20px;
    font-size: 20px;
    text-align: center;
    text-shadow: 0 0 20px #00000099;
    cursor: default;
    transition: all 0.5s ease-in-out;

    &:hover {
      transform: scale(105%);
    }
  }

  & > ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    gap: 5px;
    flex-grow: 1;

    & > a {
      text-decoration: none;
      color: #222222;
    }
  }

  & > div {
    display: flex;
    justify-content: center;
    padding: 20px;

    & > a {
      text-decoration: none;
      color: #222222;
      font-weight: 500;
      text-shadow: 0 0 10px #00000088;
    }
  }
`;

export const menuListItem = (isSelected) => css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 7px;
  padding: 5px 15px;
  width: 100%;
  height: 35px;
  font-weight: 500;
  transition: all 0.1s ease-in-out;
  box-shadow: 0 0 ${isSelected ? "10px" : "0"} #00000077 inset;
  &:hover {
    text-shadow: 0 0 15px #00000066;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    width: 30px;
    height: 100%;
    font-size: 20px;
  }
`;

export const profileImg = (url) => css`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  overflow: hidden;
  background-image: url(${url});
  background-position: center;
  background-size: cover;
`;

export const aiChat = css`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #ffffff;
  background-color: #1673bf;
  cursor: pointer;

  &:hover {
    background-color: #0078c2ff;
  }

  &:active {
    background-color: #0071b7;
  }
`;

export const aiChatLayout = (isOpen) => css`
  transition: all 0.5s ease-in-out;
  transform: ${isOpen ? "translate(0, 0)" : "translate(100%, 100%)"};
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${isOpen ? 10 : -10};
  box-sizing: border-box;
  border-radius: 20px 0 0 20px;
  padding: 20px;
  width: 730px;
  height: 100%;
  background-color: #f3f5f7;
  opacity: ${isOpen ? 1 : 0};
`;

export const aiChatContainer = () => css`
  box-sizing: border-box;
  padding-bottom: 30px;
  height: 100%;
  width: 100%;
  
`;

export const aiChatClose = css`
  position: absolute;
  right: 20px;
  bottom: 20px;
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  padding: 5px 15px;
  background-color: #ff4141ff;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #f13e3eff;
  }
  &:active {
    background-color: #df3939ff;
  }
`;
