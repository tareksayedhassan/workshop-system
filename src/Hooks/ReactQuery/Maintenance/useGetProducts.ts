import { BASE_URL, ProductsSetup } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (id?: number) => {
  const params = new URLSearchParams();
  if (id !== undefined) params.set("search", id.toString());
  params.set("id", id?.toString() || "0");

  const res = await axios.get(
    `${BASE_URL}/${ProductsSetup}?${params.toString()}`
  );
  return res.data;
};

const useGetProducts = (id?: number) => {
  return useQuery({
    queryKey: ["ProductsSetup", id],
    queryFn: () => fetchData(id),
    staleTime: 1000 * 10,
    enabled: id !== undefined,
  });
};

export default useGetProducts;
