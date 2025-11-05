"use client";

import MobileSideBar from "@/src/components/CustomUi/MobildSideBar";
import SideBar from "@/src/components/CustomUi/SideBar";
import TopBar from "@/src/components/CustomUi/TopBar";
import React, { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useGetuserId();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[#f9f9f9] overflow-x-hidden">
        <TopBar />
        <div style={{ display: "flex", flex: 1 }}>
          <main
            className="main-content"
            style={{
              flex: 1,
              padding: "2rem 1rem",
              paddingTop: "70px",
              backgroundColor: "#f9f9f9",
              overflowX: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
                overflowX: "hidden",
              }}
            >
              {children}
            </div>
          </main>
          {role === "ReaderAndwrater" && (
            <>
              <div className="hidden xl:flex items-center gap-8">
                <div style={{ width: "200px", flexShrink: 0 }}>
                  <SideBar />
                </div>
              </div>

              {/* Sidebar Mobile */}
              <div className="xl:hidden">
                <div style={{ flexShrink: 0 }}>
                  <MobileSideBar />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
