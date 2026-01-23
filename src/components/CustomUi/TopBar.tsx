"use client";

import Image from "next/image";
import NotificationBell from "@/src/components/CustomUi/Noitifaction";
import Link from "next/link";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { useTranslate } from "@/public/localization";
import { useRouter } from "next/navigation";
import MobileSideBar from "@/src/components/CustomUi/MobildSideBar";
import LanguageToggle2 from "./ToogleButton";

const TopBar = () => {
  const router = useRouter();
  const { role, name, cookie } = useGetuserId();
  const t = useTranslate();

  const logOut = () => {
    cookie.remove("Bearer");
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[70px] z-[100] flex items-center justify-between px-4 md:px-8 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      {/* 1. جهة اللوجو */}
      <div className="flex items-center">
        <Link
          href="/dashboard"
          className="transition-transform hover:scale-105"
        >
          <Image
            src="/assts/logo.png"
            height={50}
            width={130}
            alt="logo"
            className="object-contain h-10 w-auto"
            priority
          />
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {name && (
          <span className="hidden lg:block text-sm font-bold text-slate-600 border-e border-gray-200 pe-6">
            {t("hello")}, {name}
          </span>
        )}

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:block">
            <LanguageToggle2 />
          </div>

          {role === "ReaderAndwrater" && (
            <div className="flex items-center gap-6 md:gap-10">
              <NotificationBell />
              <div className="xl:hidden flex items-center border-s border-gray-200 ps-4 md:ps-6">
                <MobileSideBar />
              </div>
            </div>
          )}
          {role !== "ReaderAndwrater" && (
            <button
              onClick={logOut}
              className="hidden sm:block bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 rounded-xl text-xs font-black transition-all duration-300"
            >
              {t("LogOut")}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
