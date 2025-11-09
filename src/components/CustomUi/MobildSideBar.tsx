"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookie from "cookie-universal";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { FaBars, FaBox } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { JwtPayload } from "jsonwebtoken";
import { MdOutlineDashboard } from "react-icons/md";
export const dynamic = "force-dynamic";
import { FaUsersGear } from "react-icons/fa6";

import { SkeletonCard } from "./SkeletonCard";
import { useTranslate } from "@/public/localization";
import { BiSolidCategory } from "react-icons/bi";
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
  const t = useTranslate();
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
        className={`xl:hidden text-gray-800 text-[20px] cursor-pointer hover:text-emerald-600 fixed top-6 left-6 z-[1001] transition-opacity duration-200 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <FaBars />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[80vw] max-w-[280px] bg-white border-none shadow-lg p-0 overflow-hidden"
      >
        {loading ? (
          <div className="p-4 pt-[80px]">
            <SkeletonCard />
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pt-[80px] px-3 pb-20">
              <div className="flex flex-col gap-1">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
                >
                  <MdOutlineDashboard className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{t("dashboard")}</span>
                </Link>

                <Link
                  href="/dashboard/products"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
                >
                  <FaBox className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{t("Product Setup")}</span>
                </Link>

                <Link
                  href="/dashboard/productsCategoryes"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
                >
                  <BiSolidCategory className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{t("Categories")}</span>
                </Link>

                <Link
                  href="/dashboard/MaintenanceSetup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
                >
                  <BiSolidCategory className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{t("Maintenance Setup")}</span>
                </Link>

                <Link
                  href="/dashboard/users"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
                >
                  <FaUsersGear className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{t("Users Management")}</span>
                </Link>
              </div>
            </nav>

            {/* Logout Button - Fixed at Bottom */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={logOut}
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg
                bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 
                transition-all duration-200 font-medium text-sm shadow-sm hover:shadow"
              >
                <span>{t("LogOut")}</span>
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
