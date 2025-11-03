"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookie from "cookie-universal";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { useEffect, useState } from "react";

import { MdOutlineDashboard } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

import { SkeletonCard } from "./SkeletonCard";
import { useTranslate } from "@/public/localization";
import { FaUsersGear } from "react-icons/fa6";

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

  const [loading, setLoading] = useState(true);
  const [decoded, setDecoded] = useState<MyJwtPayload | null>(null);

  const t = useTranslate();

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

  if (loading) return <SkeletonCard />;

  // روابط لكل دور
  const allLinks = [
    {
      href: "/dashboard",
      icon: <MdOutlineDashboard className="text-xl" />,
      label: t("dashboard"),
    },
    {
      href: "/dashboard/products",
      icon: <FaBox className="text-xl" />,
      label: t("Product Setup"),
    },
    {
      href: "/dashboard/productsCategoryes",
      icon: <BiSolidCategory className="text-xl" />,
      label: t("Categories"),
    },
    {
      href: "/dashboard/MaintenanceSetup",
      icon: <BiSolidCategory className="text-xl" />,
      label: t("Maintenance Setup"),
    },
    {
      href: "/dashboard/users",
      icon: <FaUsersGear className="text-xl" />,
      label: t("Users Management"),
    },
  ];

  // لو الدور ReaderAndwrater → كل الروابط، غيره → Dashboard بس
  const linksToShow =
    Role === "ReaderAndwrater"
      ? allLinks
      : allLinks.filter((l) => l.href === "/dashboard");

  return (
    <div
      className="fixed top-[70px] right-0 h-[calc(100vh-70px)] w-64 bg-white shadow-md p-3 z-50 overflow-y-auto scrollbar-none"
      dir="rtl"
    >
      <div className="flex flex-col gap-1">
        {linksToShow.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition duration-200"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
        <button
          onClick={logOut}
          className="absolute bottom-3 left-1/2 transform -translate-x-1/2 transition duration-200 font-medium text-sm rounded-md bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 px-10 py-1.5 w-full cursor-pointer"
        >
          {t("Logout")}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
