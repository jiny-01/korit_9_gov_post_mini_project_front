import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuth2() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    console.log(accessToken);
    if (!!accessToken) {
      alert("로그인 성공!");
    } else {
      alert("로그인 후 이용바랍니다.");
      navigate("/auth/login");
    }
  }, [accessToken]);
  return <></>;
}

export default OAuth2;
