/** @jsxImportSource @emotion/react */
import * as s from "./styles";

import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleOAuth2LoginOnClick = (e) => {
    const clientName = e.target.id;
    navigate("http://localhost:8080/oauth2/authorization/" + clientName);
  };

  return (
    <div css={s.layout}>
      <div css={s.container}>
        <div css={s.leftBackground}></div>
        <div css={s.rightContainer}>
          <h1>Social Board</h1>
          <p>친구들과 함께 사진 또는 글을 공유해보세요.</p>
          <div>
            <button
              id="google"
              css={s.google}
              onClick={handleOAuth2LoginOnClick}
            >
              <FcGoogle />
              구글 로그인
            </button>
            <button id="naver" css={s.naver} onClick={handleOAuth2LoginOnClick}>
              <SiNaver />
              네이버 로그인
            </button>
            <button id="kakao" css={s.kakao} onClick={handleOAuth2LoginOnClick}>
              <RiKakaoTalkFill />
              카카오 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
