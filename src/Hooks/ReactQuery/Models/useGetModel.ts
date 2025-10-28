import { BASE_URL, Brands, Models } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetModel = () => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${Models}`);

      return res.data;
    } catch (error) {
      console.error("Error fetching BuyReturn table data:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["Models"],
    queryFn: fetchData,
    enabled: true,
    staleTime: 1000 * 60,
    refetchInterval: 5000,
  });
};
