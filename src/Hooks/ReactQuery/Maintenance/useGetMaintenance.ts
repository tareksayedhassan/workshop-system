import { BASE_URL, MaintenanceTable } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetMaintenance = ({ BrandId, ModelId }: any) => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/${MaintenanceTable}/${ModelId}`,
        { params: { BrandId } }
      );
      return data;
    } catch (error) {
      console.error("Error fetching Maintenance table data:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["MaintenanceTable", ModelId, BrandId],
    queryFn: fetchData,
    enabled: !!ModelId,
    staleTime: 60 * 1000,
    refetchInterval: 5000,
  });
};
