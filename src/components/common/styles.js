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
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-color: #f3f5f7;
  overflow: hidden;
`;
