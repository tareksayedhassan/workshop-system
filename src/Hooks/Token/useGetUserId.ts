"use client";
import { DecodedToken } from "@/src/Types/CustomJWTdecoded";
import Cookie from "cookie-universal";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useGetuserId = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);

        if (typeof decoded.id === "number") {
          setUserId(decoded.id);
        } else {
          toast.error("id المستخدم غير صالح.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [token]);
  return { userId };
};

export default useGetuserId;
