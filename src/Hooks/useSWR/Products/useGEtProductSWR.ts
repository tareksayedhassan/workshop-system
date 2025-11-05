import { BASE_URL, ProductsSetup } from "@/src/services/page";
import useSWR from "swr";
import { fetcher } from "../fetcher";

const useGEtProductSWR = (params?: { querySearch?: string; page?: number }) => {
  const querySearch = params?.querySearch ?? "";
  const page = params?.page ?? 1;

  const { data, error, isLoading, mutate } = useSWR(
    `${BASE_URL}/${ProductsSetup}?page=${page}&searchQuery=${querySearch}`,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useGEtProductSWR;
