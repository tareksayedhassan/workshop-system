import { BASE_URL, Brands, ProductsSetup } from "@/src/services/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import FetchToken from "../../Token/FetchToken";
const fetchData = async () => {
  const { token } = FetchToken();
  const res = await axios.get(`${BASE_URL}/${Brands}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const useGetproductSetup = (page: number, search: string) => {
  const query = useQuery({
    queryKey: ["Brands"],
    queryFn: fetchData,
    staleTime: 1000 * 10,
    placeholderData: keepPreviousData,
  });
  return query;
};
export default useGetproductSetup;
