"use client";

import Image from "next/image";
import NotificationBell from "@/src/components/CustomUi/Noitifaction";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { useTranslate } from "@/public/localization";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter();
  const { role, name, cookie } = useGetuserId();
  const t = useTranslate();
  const logOut = () => {
    cookie.remove("Bearer");
    router.push("/");
  };
  return (
    <div
      className="flex items-center justify-between px-4 md:px-6 lg:px-8 shadow bg-white/80 backdrop-blur-sm"
      style={{
        height: "70px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div className="flex-1">
        {role === "Wrater" && (
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="text-sm sm:text-base md:text-lg font-medium truncate">
              {t("hello")} {name}
            </h1>

            <button
              onClick={logOut}
              className="bg-red-400/70 text-white px-3 sm:px-4 md:w-40 rounded-2xl py-2 text-xs sm:text-sm md:text-base cursor-pointer hover:bg-red-400 transition-colors whitespace-nowrap"
            >
              {t("LogOut")}
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <LanguageToggle />

        {role === "ReaderAndwrater" && (
          <div className="">
            <NotificationBell />
          </div>
        )}

        <Link href={"/dashboard"} className="flex-shrink-0">
          <Image
            src="/assts/logo.png"
            height={120}
            width={160}
            alt="logo"
            className="object-contain h-10 sm:h-12 md:h-14 w-auto"
            priority
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
