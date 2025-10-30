"use client";

import Cookie from "cookie-universal";
import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useEffect, useState } from "react";
import NotificationBell from "@/src/components/CustomUi/Noitifaction";
import Link from "next/link";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";

const TopBar = () => {
  return (
    <div
      className="flex items-center justify-between px-4 shadow bg-white/80"
      style={{
        height: "70px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div className="flex items-center gap-2"></div>

      <div className="flex items-center gap-4 text-end ">
        <div className="flex items-center gap-5 sm:gap-10  sm:mr-10">
          <NotificationBell />
          <Link href={"/dashboard"}>
            <Image
              src="/assts/logo.png"
              height={120}
              width={160}
              alt="logo"
              style={{ height: "auto" }}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
