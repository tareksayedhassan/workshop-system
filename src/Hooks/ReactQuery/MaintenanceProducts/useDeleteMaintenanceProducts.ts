import { BASE_URL, Brands, MaintenanceProducts } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteMaintenanceProducts = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      axios
        .delete(`${BASE_URL}/${MaintenanceProducts}/${id}`)

        .then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["MaintenanceProducts"] });
    },
  });
};
