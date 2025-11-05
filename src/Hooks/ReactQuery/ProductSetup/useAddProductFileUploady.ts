// useAddProductFileUploady.ts
import { BASE_URL, ProductsSetup } from "@/src/services/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Payload = {
  file: File;
};

export const useAddProductFileUploady = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const formData = new FormData();
      formData.append("file", payload.file);

      const res = await axios.post(
        `${BASE_URL}/${ProductsSetup}/fileUpload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    },
    onSuccess: () => {
      // الحل النهائي: جلب الداتا فوراً بعد الـ upload
      queryClient.refetchQueries({
        queryKey: ["ProductsSetup"],
        exact: false,
        type: "all",
      });
    },
    onError: (error) => {
      console.error("File upload failed:", error);
    },
  });
};
