import { BASE_URL, ProductPrice } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Params = {
  id: number;
  search?: string;
};

const fetchData = async ({ id, search }: Params) => {
  const url = search
    ? `${BASE_URL}/${ProductPrice}/${id}?search=${encodeURIComponent(search)}`
    : `${BASE_URL}/${ProductPrice}/${id}`;

  const res = await axios.get(url);
  return res.data;
};

const useGetProductPrice = ({ id, search }: Params) => {
  return useQuery({
    queryKey: ["ProductPrice", id, search],
    queryFn: () => fetchData({ id, search }),
    staleTime: 1000 * 10,
    enabled: id !== undefined,
  });
};

export default useGetProductPrice;
