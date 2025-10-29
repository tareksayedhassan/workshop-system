import { BASE_URL, MaintenanceTable } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usegetMaintenance = (ModelId: number) => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${MaintenanceTable}/${ModelId}`);

      return res.data;
    } catch (error) {
      console.error("Error fetching BuyReturn table data:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["MaintenanceTable"],
    queryFn: fetchData,
    enabled: true,
    staleTime: 1000 * 60,
    refetchInterval: 5000,
  });
};
