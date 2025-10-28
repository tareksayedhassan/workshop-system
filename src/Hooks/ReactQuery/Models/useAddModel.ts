import { BASE_URL, Brands, Models } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type payload = {
  modelName: string;
  engineCC: number;
  carId: number;
  ProductId?: number;
  userId: number;
};
export const useAddModel = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: payload) =>
      axios
        .post(`${BASE_URL}/${Models}`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["Models"] });
    },
  });
};
