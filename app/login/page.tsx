"use client";
import React from "react";
import LoginForm from "@/src/components/CustomUi/login-form";
import { SpinerLoading } from "@/src/components/CustomUi/SpinerLoading";
import { useLoginLoading } from "@/src/store/users/LoginLoading";
import scoda from "../../public/assts/Header_bp1920_1.webp";

const Page = () => {
  const { loading } = useLoginLoading();

  return (
    <div
      className="flex justify-start items-center min-h-screen bg-center bg-cover relative"
      style={{ backgroundImage: `url(${scoda.src})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative ml-32 w-full max-w-lg">
        <div
          className="absolute -inset-1 rounded-3xl opacity-30 blur-2xl"
          style={{
            background:
              "linear-gradient(135deg, #153527 0%, #1a4d35 50%, #0f2520 100%)",
          }}
        ></div>

        <div
          className="relative p-10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10"
          style={{
            background:
              "linear-gradient(135deg, rgba(21, 53, 39, 0.25) 0%, rgba(15, 37, 28, 0.35) 100%)",
            boxShadow:
              "0 20px 60px rgba(21, 53, 39, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.5), transparent)",
            }}
          ></div>

          {loading ? <SpinerLoading /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default Page;
