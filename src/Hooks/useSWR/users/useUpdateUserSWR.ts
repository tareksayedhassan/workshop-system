import React from "react";
import { fetcher } from "../fetcher";
import { BASE_URL, users } from "@/src/services/page";
import useSWR from "swr";
import { User } from "@/src/components/CustomUi/users/AddNewuser";
import axios from "axios";
import useGetuserId from "../../Token/useGetUserId";
import { toast } from "sonner";

const useUpdateUserSWR = (mutate: any) => {
  const { token } = useGetuserId();
  const updatedData = async (user: User) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/${users}/${user.id}`,
        {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("تم تحديث بيانات المستخدم بنجاح");
        mutate();
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "حدث خطأ غير متوقع";
      toast.error(message);
    }
  };
  return { updatedData };
};

export default useUpdateUserSWR;
