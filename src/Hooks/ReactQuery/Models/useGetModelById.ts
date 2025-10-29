import { BASE_URL, Brands, Models } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetModelById = (id: number) => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${Models}/${id}`);

      return res.data;
    } catch (error) {
      console.error("Error fetching BuyReturn table data:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["Models", id],
    queryFn: fetchData,
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};
