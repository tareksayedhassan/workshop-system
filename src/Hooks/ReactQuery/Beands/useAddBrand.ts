import { BASE_URL, Brands } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type payload = {
  formData: any;
};
export const useAddBrand = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ formData }: payload) =>
      axios
        .post(`${BASE_URL}/${Brands}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["Brands"] });
    },
  });
};
