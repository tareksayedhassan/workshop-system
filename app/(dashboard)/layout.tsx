"use client";

import MobileSideBar from "@/src/components/CustomUi/MobildSideBar";
import SideBar from "@/src/components/CustomUi/SideBar";
import TopBar from "@/src/components/CustomUi/TopBar";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../i18n.ts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const query = new QueryClient();
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={query}>
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
          <div className="hidden xl:flex items-center gap-8">
            <div style={{ width: "200px", flexShrink: 0 }}>
              <SideBar />
            </div>
          </div>
          <div className="xl:hidden">
            <div style={{ flexShrink: 0 }}>
              <MobileSideBar />
            </div>
          </div>
        </div>
      </div>{" "}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
