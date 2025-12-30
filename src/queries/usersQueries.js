import { useQuery } from "@tanstack/react-query";
import { requestMe } from "../apis/users/usersApi";

export const useMeQuery = () => {
  const accessToken = localStorage.getItem("AccessToken");
  // console.log("accessToken:", accessToken);

  return useQuery({
    queryKey: ["me", accessToken],
    queryFn: async () => {
      try {
        const res = await requestMe();
        console.log("requestMe success:", res);
        return res;
      } catch (error) {
        console.log("requestMe error:", error);
        return error?.response ?? { status: 401, data: null };
      }
    },
  });
};
