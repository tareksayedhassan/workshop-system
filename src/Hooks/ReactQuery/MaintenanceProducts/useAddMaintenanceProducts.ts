import { BASE_URL, Brands, MaintenanceProducts } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Payload = {
  km: string;
  carId: number;
  userId: number;
  Products: {
    ProductId: number;
    price: number;
    Quantity: number;
  }[];
  MaintenanceTableId: number;
  ModeleId: number;
};
export const useAddMaintenanceProducts = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: Payload) =>
      axios
        .post(`${BASE_URL}/${MaintenanceProducts}`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })

        .then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["Brands"] });
    },
  });
};
