import { BASE_URL, Models } from "@/src/services/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async ({ queryKey }: any) => {
  const [_key, brandId] = queryKey;
  const res = await axios.get(`${BASE_URL}/${Models}`, {
    params: { brandId: brandId },
  });

  return res.data;
};

export const useGetModelByBrandId = (brandId?: number | string) => {
  return useQuery({
    queryKey: ["Models", brandId],
    queryFn: fetchData,
    enabled: !!brandId,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });
};
