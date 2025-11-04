import { BASE_URL, users } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/${users}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
  });
};
