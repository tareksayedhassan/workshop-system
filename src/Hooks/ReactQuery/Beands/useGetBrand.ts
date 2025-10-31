import { BASE_URL, Brands } from "@/src/services/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetBrand = () => {
  const fetchData = async () => {
    if (typeof window === "undefined") return { data: [] }; // 🧠 يمنع التنفيذ وقت SSR

    try {
      const res = await axios.get(`${BASE_URL}/${Brands}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching Brand data:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["Brands"],
    queryFn: fetchData,
    enabled: true,
    staleTime: 1000 * 60, // دقيقة
    refetchOnWindowFocus: true, // لما المستخدم يرجع للتبويب
    refetchInterval: false, // ❌ شيل الريفريش كل 5 ثواني
  });
};
