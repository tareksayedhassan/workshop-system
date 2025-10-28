import { BASE_URL, ProductsSetup } from "@/src/services/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchData = async () => {
  const res = await axios.get(`${BASE_URL}/${ProductsSetup}`);
  return res.data;
};

const useGetProducts = () => {
  const query = useQuery({
    queryKey: ["ProductsSetup"],
    queryFn: fetchData,
    staleTime: 1000 * 10,
    placeholderData: keepPreviousData,
  });
  return query;
};
export default useGetProducts;
