import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  localStorage.removeItem("AccessToken");
  
  // useEffect 빈 배열 - 무조건 1번 실행
  //보통 alert 창 - 마운트될 때 1번
  useEffect(() => {
    alert("로그아웃");
    navigate("/auth/login");
  }, []);

  return <></>;
}

export default Logout;
