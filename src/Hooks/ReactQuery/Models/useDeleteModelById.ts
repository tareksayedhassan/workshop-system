import { BASE_URL, Brands, Models } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Payload = {
  id: number;
  userId: number;
};

export const useDeleteModelById = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: (payload: Payload) =>
      axios
        .delete(`${BASE_URL}/${Models}/${payload.id}`, {
          data: payload,
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
