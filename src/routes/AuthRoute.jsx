import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import { useEffect } from "react";
import OAuth2 from "../pages/auth/OAuth2";
import { useMeQuery } from "../queries/usersQueries";
import Logout from "../pages/auth/Logout";
import Loading from "../components/common/Loading";
import Home from "../pages/home/Home";
import LeftSideBar from "../components/common/LeftSideBar";

// 인증 관련 라우트
function AuthRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const meQuery = useMeQuery();

  // 주소 이동이 일어날 때마다 root(/) 로 가는지 확인
  // 로그인 페이지로 보냄
  // 로그인 된 상태면? - 로그인페이지로 가면 X

  //pathname 이 변하면 렌더링되면서 useEffect 실행됨
  useEffect(() => {
    const { isLoading, data } = meQuery;
    if (!isLoading) {
      if (data.status !== 200) {
        //pathname(현재주소 : 홈 "/")이 이 배열에 포함되어 있지않으면
        // 로그인 페이지로 보냄
        //=> 비로그인 상태에서 홈으로 가면 로그인페이지로 보냄
        if (!pathname.startsWith("/auth")) {
          navigate("/auth/login");
        }
      } else {
        //로그인 상태이면 동작하지 않음
        //로그인 성공 시 이 2가지 경로로 들어갔을 땐 홈으로 보냄
        if (pathname.startsWith("/auth")) {
          navigate("/");
        }
      }
    }
  }, [pathname, meQuery.data]);

  //   return 의 분기를 3개로 나눔

  //   로딩중이면 무조건 이 분기
  if (meQuery.isLoading) {
    return <Loading />;
  }

  // 실패한 경우 - 로그인 화면으로
  if (meQuery.isSuccess && meQuery.data?.status !== 200) {
    return (
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/login/oauth2" element={<OAuth2 />} />
      </Routes>
    );
  }

  //로그인 상태
  return (
    <LeftSideBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </LeftSideBar>
  );
}

export default AuthRoute;
