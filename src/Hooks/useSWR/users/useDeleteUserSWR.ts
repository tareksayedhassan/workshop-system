import React from "react";
import { fetcher } from "../fetcher";
import { BASE_URL, users } from "@/src/services/page";
import useSWR from "swr";
import { User } from "@/src/components/CustomUi/users/AddNewuser";
import axios from "axios";
import useGetuserId from "../../Token/useGetUserId";
import { toast } from "sonner";
import { registerClient } from "@/src/zodVaildate/ZodSchema";
interface IProps {
  mutate: any;
}
const useDeleteUserSWR = ({ mutate }: IProps) => {
  const { token } = useGetuserId();

  const handelDelete = async (id: string | number) => {
    try {
      console.log(id);
      const res = await axios.delete(`${BASE_URL}/${users}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.success("تم حذف المستخدم بنجاح");
        mutate();
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "حدث خطأ غير متوقع";
      toast.error(message);
    }
  };

  return { handelDelete };
};

export default useDeleteUserSWR;
