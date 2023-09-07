import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";

const useAuth = () => {
  const token = localStorage.getItem("token");
  const data = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await client.get("/api/user/me");
      return res;
    },
    cacheTime: Infinity,
    enabled: !!token,
  });

  return data;
};
export default useAuth;
