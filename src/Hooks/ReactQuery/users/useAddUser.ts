import { BASE_URL, Brands, users } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Payload = {
  name: string;
  email: string;
  password: string;
  role: string;
};
export const useAddUser = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: Payload) =>
      axios.post(`${BASE_URL}/${users}`, payload, {}).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
