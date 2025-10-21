import { BASE_URL, LOGIN } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type payload = {
  email: string;
  password: string;
};

export const UseLogin = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: (payload: payload) =>
      axios.post(`${BASE_URL}/${LOGIN}`, payload).then((res) => res.data),

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
