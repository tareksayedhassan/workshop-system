// src/hooks/useGetProductsForshowByProducts.ts
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL, ProductsSetup } from "@/src/services/page";

type ProductData = {
  data: any[];
  total: number;
};

const fetchData = async ({ queryKey }: any): Promise<ProductData> => {
  const [_key, searchQuery, BrandId] = queryKey;

  const res = await axios.get(`${BASE_URL}/${ProductsSetup}/showByProducts`, {
    params: { limit: 10, searchQuery, BrandId },
  });
  return res.data;
};

const useGetProductsForshowByProducts = (
  searchQuery: string,
  BrandId: string
): UseQueryResult<ProductData, Error> & { refetchData: () => void } => {
  const queryClient = useQueryClient();

  const query = useQuery<ProductData, Error>({
    queryKey: ["ShowbyProducts", searchQuery, BrandId],
    queryFn: fetchData,
    staleTime: 1000 * 10,
  });

  const refetchData = () => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === "ShowbyProducts" &&
        query.queryKey[1] === searchQuery &&
        query.queryKey[2] === BrandId,
    });
  };

  return { ...query, refetchData };
};

export default useGetProductsForshowByProducts;
