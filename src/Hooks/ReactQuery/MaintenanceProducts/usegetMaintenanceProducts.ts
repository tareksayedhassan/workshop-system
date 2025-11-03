import { BASE_URL, MaintenanceProducts } from "@/src/services/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async ({ queryKey }: any) => {
  const [_key, BrandId] = queryKey;

  console.log("from reactQueryHook", BrandId);
  const res = await axios.get(`${BASE_URL}/${MaintenanceProducts}`, {
    params: { BrandId },
  });

  return res.data;
};

export const usegetMaintenanceProducts = (BrandId?: number | string) => {
  return useQuery({
    queryKey: ["MaintenanceProducts", BrandId],
    queryFn: fetchData,
    enabled: !!BrandId,
    staleTime: 1000 * 60, // دقيقة
    placeholderData: keepPreviousData,
  });
};
