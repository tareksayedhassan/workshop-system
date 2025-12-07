import { BASE_URL, ProductsSetup } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type payload = {
  productCode: any;
  name: string;
  price: any;
  Status: "available" | "unavailable" | "";
  userId: number;
  Model: string;
};
export const useAddProduct = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: payload) =>
      axios
        .post(`${BASE_URL}/${ProductsSetup}`, payload, {
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
