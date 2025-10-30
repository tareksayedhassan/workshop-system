import { BASE_URL, ProductsSetup } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type payload = {
  id: number;

  Status: "unavailable" | "available" | "";
};
export const useupdateProduct = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: payload) =>
      axios
        .patch(`${BASE_URL}/${ProductsSetup}/${payload.id}`, payload, {
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
