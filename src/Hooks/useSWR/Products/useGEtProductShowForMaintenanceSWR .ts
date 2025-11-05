import { BASE_URL, ProductsSetup } from "@/src/services/page";
import useSWR from "swr";
import { fetcher } from "../fetcher";

const useGEtProductShowForMaintenanceSWR = (params?: {
  querySearch?: string;
  BrandId?: number;
}) => {
  const querySearch = params?.querySearch ?? "";
  const BrandId = params?.BrandId ?? "";

  const url = `${BASE_URL}/${ProductsSetup}/showByProducts?searchQuery=${encodeURIComponent(
    querySearch
  )}${BrandId ? `&BrandId=${BrandId}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default useGEtProductShowForMaintenanceSWR;
