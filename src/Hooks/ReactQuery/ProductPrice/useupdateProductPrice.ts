import { BASE_URL, ProductPrice } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type payload = {
  id: number;

  price: number;
};
export const useProductPrice = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: payload) =>
      axios
        .patch(`${BASE_URL}/${ProductPrice}/${payload.id}`, payload, {
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
