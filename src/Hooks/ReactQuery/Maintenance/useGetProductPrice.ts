import { BASE_URL, ProductPrice } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Params = {
  id: number;
  searchQuery?: string;
};

const fetchData = async ({ id, searchQuery }: Params) => {
  const url = searchQuery
    ? `${BASE_URL}/${ProductPrice}/${id}?search=${encodeURIComponent(
        searchQuery
      )}`
    : `${BASE_URL}/${ProductPrice}/${id}`;

  const res = await axios.get(url);
  return res.data;
};

const useGetProductPrice = ({ id, searchQuery }: Params) => {
  return useQuery({
    queryKey: ["ProductPrice", id, searchQuery],
    queryFn: () => fetchData({ id, searchQuery }),
    staleTime: 1000 * 10,
    enabled: id !== undefined,
  });
};

export default useGetProductPrice;
