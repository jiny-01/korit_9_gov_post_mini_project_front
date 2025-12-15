import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import { useEffect } from "react";
import OAuth2 from "../pages/auth/OAuth2";

// 인증 관련 라우트
function AuthRoute() {
    const navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;

    // 주소 이동이 일어날 때마다 root(/) 로 가는지 확인
    // 로그인 페이지로 보냄
    // 로그인 된 상태면? - 로그인페이지로 가면 X

    useEffect(() => {
        console.log(pathname);
        if (pathname === "/") {
            navigate("/auth/login");
        }
    }, [pathname]);
    return <Routes>
        <Route path="/" element={<></>} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/login/oauth2" element={<OAuth2 />} />
        <Route path="auth/signup" element={<SignUp />} />
    </Routes>

}

export default AuthRoute;