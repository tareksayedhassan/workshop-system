import { BASE_URL, Brands, Models } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type payload = {
  id: number;
  modelName: string;
  engineCC: number;

  userId: number;
};
export const useEditModel = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: payload) =>
      axios
        .patch(`${BASE_URL}/${Models}/${payload.id}`, payload, {
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
