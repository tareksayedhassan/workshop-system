"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookie from "cookie-universal";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { MdOutlineDashboard } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";

import { useEffect, useState } from "react";

import { SkeletonCard } from "./SkeletonCard";

import { FaBox } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { useTranslate } from "@/public/localization";
export const dynamic = "force-dynamic";
interface MyJwtPayload extends JwtPayload {
  avatar?: string;
  name?: string;
  role?: string;
}

const SideBar = () => {
  const router = useRouter();
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  const t = useTranslate();
  const [loading, setLoading] = useState(true);
  const [decoded, setDecoded] = useState<MyJwtPayload | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<MyJwtPayload>(token);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
        setDecoded(null);
      }
    }
    setLoading(false);
  }, [token]);

  const Role = decoded?.role;

  const logOut = () => {
    cookie.remove("Bearer");
    router.push("/");
  };

  return (
    <>
      {loading ? (
        <SkeletonCard />
      ) : (
        <div
          className="fixed top-[70px] right-0 h-[calc(100vh-70px)] w-64 bg-white shadow-md p-3 z-50 overflow-y-auto scrollbar-none"
          dir="rtl"
        >
          <div className="flex flex-col gap-1">
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <MdOutlineDashboard className="text-xl" />
                <span> {t("dashboard")}</span>
              </Link>

              <Link
                href="/dashboard/products"
                className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <FaBox className="text-xl" />
                <span> {t("Product Setup")}</span>
              </Link>
              <Link
                href="/dashboard/productsCategoryes"
                className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <BiSolidCategory className="text-xl" />
                <span> {t("Categories")} </span>
              </Link>
              <Link
                href="/dashboard/MaintenanceSetup"
                className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <BiSolidCategory className="text-xl" />
                <span>{t("Maintenance Setup")} </span>
              </Link>

              <Link
                href="/dashboard/users"
                className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <FaUsersGear className="text-xl" />
                <span>{t("Users Management")}</span>
              </Link>
            </>
            <button
              onClick={logOut}
              className="absolute bottom-3 left-1/2 transform -translate-x-1/2 
             transition duration-200 font-medium text-sm rounded-md 
             bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 
             px-10 py-1.5 w-full cursor-pointer"
            >
              {t("LogOut")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
