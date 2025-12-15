import { css } from "@emotion/react";

export const global = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

  html {
    height: 100vh;
    background-color: #fafafa;
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-size: 16px;
  }

  body,
  #root {
    margin: 0;
    height: 100vh;
  }
`;
