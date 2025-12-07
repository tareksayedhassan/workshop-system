import { BASE_URL, MaintenanceTable } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usegetMaintenanceForSetup = (ModelId: number, BrandId: number) => {
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/${MaintenanceTable}/${ModelId}`,
        {
          params: { BrandId },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching Maintenance table data:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["MaintenanceTable", ModelId, BrandId],
    queryFn: fetchData,
    enabled: !!ModelId,
    staleTime: 1000 * 60,
    refetchInterval: 5000,
  });
};
