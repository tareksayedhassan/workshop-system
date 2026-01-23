"use client";

import MobileSideBar from "@/src/components/CustomUi/MobildSideBar";
import SideBar from "@/src/components/CustomUi/SideBar";
import TopBar from "@/src/components/CustomUi/TopBar";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import useGetLang from "@/src/Hooks/useGetLang";

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useGetuserId();
  const { lang } = useGetLang();

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="min-h-screen flex flex-col bg-[#f9f9f9]"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <TopBar />

        <div className="flex flex-1 pt-[70px]">
          {role === "ReaderAndwrater" && (
            <aside className="hidden xl:block w-[240px] shrink-0 bg-white border-e border-gray-200 sticky top-[70px] h-[calc(100vh-70px)]">
              <SideBar />
            </aside>
          )}

          <main className="flex-1 min-w-0 overflow-hidden">
            <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
