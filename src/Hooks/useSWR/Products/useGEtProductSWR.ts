import { BASE_URL, ProductsSetup } from "@/src/services/page";
import useSWR from "swr";
import { fetcher } from "../fetcher";

const useGEtProductSWR = (params?: {
  querySearch?: string;
  page?: number;
  Status?: string;
}) => {
  const querySearch = params?.querySearch ?? "";
  const page = params?.page ?? 1;
  const Status = params?.Status ?? "";
  const { data, error, isLoading, mutate } = useSWR(
    `${BASE_URL}/${ProductsSetup}?page=${page}&searchQuery=${querySearch}&Status=${Status}`,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useGEtProductSWR;
