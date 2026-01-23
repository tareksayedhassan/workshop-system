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
import { FaUsersGear } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";

import { SkeletonCard } from "./SkeletonCard";
import { useTranslate } from "@/public/localization";
import LanguageToggle2 from "./ToogleButton";

export const dynamic = "force-dynamic";

interface MyJwtPayload extends JwtPayload {
  avatar?: string;
  name?: string;
  role?: string;
}

const MobileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [decoded, setDecoded] = useState<MyJwtPayload | null>(null);

  const router = useRouter();
  const cookie = Cookie();
  const token = cookie.get("Bearer");
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

  const logOut = () => {
    cookie.remove("Bearer");
    router.push("/");
    setIsOpen(false);
  };

  const navLinks = [
    { href: "/dashboard", icon: <MdOutlineDashboard />, label: t("dashboard") },
    { href: "/dashboard/products", icon: <FaBox />, label: t("Product Setup") },
    {
      href: "/dashboard/productsCategoryes",
      icon: <BiSolidCategory />,
      label: t("Categories"),
    },
    {
      href: "/dashboard/MaintenanceSetup",
      icon: <BiSolidCategory />,
      label: t("Maintenance Setup"),
    },
    {
      href: "/dashboard/users",
      icon: <FaUsersGear />,
      label: t("Users Management"),
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className={`xl:hidden text-gray-800 text-[24px] p-2 fixed top-4 left-4 z-[1001] transition-opacity duration-200 ${
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <FaBars />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[85vw] max-w-[300px] bg-white border-none shadow-2xl p-0 flex flex-col"
      >
        {loading ? (
          <div className="p-6 pt-20">
            <SkeletonCard />
          </div>
        ) : (
          <>
            {/* Header/Logo Area */}
            <div className="p-6 pt-12 border-b border-gray-50">
              <h2 className="text-xl font-bold text-teal-600">Dashboard</h2>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-teal-50 text-gray-700 hover:text-teal-600 transition-all duration-200 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span className="font-medium text-sm">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Bottom Actions Area */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
              {/* Language Toggle Component */}
              <LanguageToggle2 />

              {/* Logout Button */}
              <button
                onClick={logOut}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 font-semibold text-sm"
              >
                <span>{t("LogOut")}</span>
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
