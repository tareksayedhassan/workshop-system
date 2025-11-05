import { BASE_URL, ProductsSetup } from "@/src/services/page";
import axios from "axios";
import useGetuserId from "../../Token/useGetUserId";
import { toast } from "sonner";

const useDeleteProductSWR = (mutate: any) => {
  const { cookie } = useGetuserId();
  const Delete = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/${ProductsSetup}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("Bearer")}`,
        },
      });
      toast.success("product deleted successfully");
      mutate();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return { Delete };
};

export default useDeleteProductSWR;
