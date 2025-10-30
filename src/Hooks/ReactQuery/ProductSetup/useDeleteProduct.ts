import { BASE_URL, ProductPrice, ProductsSetup } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type payload = {
  id: number;
};
export const useDeleteProduct = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: payload) =>
      axios
        .delete(`${BASE_URL}/${ProductsSetup}/${payload.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["ProductsSetup"] });
    },
  });
};
