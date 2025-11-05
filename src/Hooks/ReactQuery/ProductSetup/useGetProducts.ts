import { BASE_URL, ProductsSetup } from "@/src/services/page";
import { useProductStatus } from "@/src/store/Products/useStatus.store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchData = async ({ queryKey }: any) => {
  const [_key, page, searchQuery, Status, model] = queryKey;

  const res = await axios.get(`${BASE_URL}/${ProductsSetup}`, {
    params: { page, limit: 10, searchQuery, Status, model },
  });
  return res.data;
};

const useGetproductSetup = (
  page: number,
  searchQuery: string,
  Status: string,
  model: string
) => {
  const query = useQuery({
    queryKey: ["ProductsSetup", page, searchQuery, Status, model],
    queryFn: fetchData,
    staleTime: 1000 * 10,
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });
  return query;
};
export default useGetproductSetup;
