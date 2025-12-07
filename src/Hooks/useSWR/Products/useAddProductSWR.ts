import { BASE_URL, ProductsSetup } from "@/src/services/page";
import axios from "axios";
import React from "react";
import useGetuserId from "../../Token/useGetUserId";
import { toast } from "sonner";
type payload = {
  productCode: any;
  name: string;
  price: any;
  Status: "available" | "unavailable" | "";
  userId: number;
  Model: string;
};
const useAddProductSWR = (mutate: any) => {
  const { cookie } = useGetuserId();
  const addProduct = async (payload: payload) => {
    try {
      await axios.post(`${BASE_URL}/${ProductsSetup}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("Bearer")}`,
        },
      });
      toast.success("product added successfully");
      mutate();
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return { addProduct };
};

export default useAddProductSWR;
