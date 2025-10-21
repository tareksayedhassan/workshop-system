"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookie from "cookie-universal";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { JwtPayload } from "jsonwebtoken";
import { MdOutlineDashboard } from "react-icons/md";

import { FaUsersGear } from "react-icons/fa6";

import { SkeletonCard } from "./SkeletonCard";
import { useTranslation } from "react-i18next";
const MobileSideBar = () => {
  interface MyJwtPayload extends JwtPayload {
    avatar?: string;
    name?: string;
    role?: string;
  }

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  const [loading, setLoading] = useState(true);
  const [decoded, setDecoded] = useState<MyJwtPayload | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<MyJwtPayload>(token);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("invalid token", error);
        setDecoded(null);
      }
    }
    setLoading(false);
  }, [token]);

  const Role = decoded?.role;

  const logOut = () => {
    cookie.remove("Bearer");
    router.push("/");
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className={`xl:hidden text-gray-800 text-[20px] cursor-pointer hover:text-emerald-600 fixed top-6 left-6 z-[1001] ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <FaBars />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[80vw] max-w-[240px] bg-white border-r-2 border-gray-200 shadow-none pt-[80px] overflow-y-auto"
      >
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
                  href="/dashboard/users"
                  className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition duration-200"
                >
                  <FaUsersGear className="text-xl" />
                  <span> {t("Users Management")}</span>
                </Link>
              </>

              <button
                onClick={logOut}
                className={`transition duration-200 font-medium text-sm rounded-md ${
                  Role === "USER"
                    ? "absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 px-10 py-1.5 w-full cursor-pointer"
                    : "mt-4 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 px-3 py-1.5"
                }`}
              >
                {t("LogOut")}
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
