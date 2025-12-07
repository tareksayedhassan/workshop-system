import { BASE_URL, Noitfaction } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useNoitifactions = () => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${Noitfaction}`);

      return res.data;
    } catch (error) {
      console.error("Error fetching BuyReturn table data:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["Noitfaction"],
    queryFn: fetchData,
    enabled: true,
    staleTime: 1000 * 60,
    refetchInterval: 5000,
  });
};
