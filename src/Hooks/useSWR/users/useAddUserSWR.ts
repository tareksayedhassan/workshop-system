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
  name: string;
  email: string;
  password: string;
  role: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
  mutate: any;
}
const useAddUserSWR = ({
  email,
  name,
  password,
  role,
  setEmail,
  setName,
  setPassword,
  setUserRole,
  mutate,
}: IProps) => {
  const handleSubmit = async () => {
    const validate = registerClient.safeParse({
      name,
      password,
      email,
      confirmPassword: password,
      role,
    });

    if (!validate.success) {
      const err = validate.error.issues[0].message;
      return toast.error(err);
    }

    try {
      const res = await axios.post(`${BASE_URL}/${users}`, {
        name,
        email,
        password,
        role,
      });
      if (res.status == 400) {
        toast.error("Email already exists");
      }
      toast.success("تم إنشاء المستخدم بنجاح");
      mutate();
      setName("");
      setEmail("");
      setPassword("");
      setUserRole("USER");
    } catch (error: any) {
      const errMessage = error?.response?.data?.message || "حدث خطأ غير متوقع";
      toast.error(errMessage);
    }
  };
  return { handleSubmit };
};

export default useAddUserSWR;
