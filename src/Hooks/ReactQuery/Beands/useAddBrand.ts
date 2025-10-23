import { BASE_URL, Brands } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type payload = {
  cate_name: string;
  Brand_logo: File;
  note: string;
  addedById: number;
};
export const useAddBrand = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ ...payload }: payload) =>
      axios.post(`${BASE_URL}/${Brands}`, payload).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["Brands"] });
    },
  });
};
