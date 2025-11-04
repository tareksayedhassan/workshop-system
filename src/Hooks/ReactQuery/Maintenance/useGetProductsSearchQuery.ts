// src/Hooks/ReactQuery/Maintenance/useGetProductsSearchQuery.ts
import { BASE_URL, ProductsSetup } from "@/src/services/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async ({ queryKey }: any) => {
  const [_key, searchQuery, BrandId] = queryKey;

  // لا ترسل طلب إذا ما في BrandId أو searchQuery فارغ (اختياري)
  if (!BrandId) return { data: [], total: 0 };

  const params: any = { limit: 50 }; // زد الحد لتجربة أفضل
  if (searchQuery?.trim()) params.searchQuery = searchQuery.trim();
  if (BrandId) params.BrandId = BrandId;

  const res = await axios.get(`${BASE_URL}/${ProductsSetup}/showByProducts`, {
    params,
  });
  return res.data;
};

const useGetProductsSearchQuery = (searchQuery: string, BrandId: number) => {
  return useQuery({
    queryKey: ["ProductsSetup", searchQuery, BrandId],
    queryFn: fetchData,
    staleTime: 1000 * 30, // 30 ثانية
    placeholderData: keepPreviousData,
    enabled: !!BrandId, // لا تبحث إذا ما في BrandId
    retry: 1,
  });
};

export default useGetProductsSearchQuery;
