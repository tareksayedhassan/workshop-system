import { BASE_URL, MaintenanceProducts } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async ({ queryKey }: any) => {
  const [_key, BrandId, MaintenanceTabelId] = queryKey;
  const res = await axios.get(`${BASE_URL}/${MaintenanceProducts}`, {
    params: { BrandId, MaintenanceTabelId },
  });

  return res.data;
};

export const usegetMaintenanceProducts = (
  BrandId: number | string,
  MaintenanceTabelId: number
) => {
  return useQuery({
    queryKey: ["MaintenanceProducts", BrandId, MaintenanceTabelId],
    queryFn: fetchData,
    enabled: !!BrandId && !!MaintenanceTabelId,
    staleTime: 1000 * 60,
  });
};
