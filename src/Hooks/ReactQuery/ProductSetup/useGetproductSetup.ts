import { BASE_URL, ProductsSetup } from "@/src/services/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchData = async ({ queryKey }: any) => {
  const [_key, page, search] = queryKey;

  const res = await axios.get(`${BASE_URL}/${ProductsSetup}`, {
    params: { page, limit: 10, search },
  });
  return res.data;
};

const useGetproductSetup = (page: number, search: string) => {
  const query = useQuery({
    queryKey: ["ProductsSetup", page, search],
    queryFn: fetchData,
    staleTime: 1000 * 10,
    placeholderData: keepPreviousData,
  });
  return query;
};
export default useGetproductSetup;
