"use client";
export const dynamic = "force-dynamic";

import { useGetBrand } from "@/src/Hooks/ReactQuery/Beands/useGetBrand";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";
import Link from "next/link";

const CarBrandsPage = () => {
  const { data, isLoading } = useGetBrand();
  const brands = data?.data ?? [];
  return (
    <div className="container mx-auto p-8 min-h-screen bg-gray-50">
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {[...Array(10)].map((_, index) => (
            <Skeleton key={index} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : brands.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No brands available right now.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {brands.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-between p-4"
            >
              <Link href="/dashboard/MaintenanceDetails">
                <div className="relative w-48 h-48 mb-4 mx-auto rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:scale-105 hover:border-gray-200">
                  <Image
                    alt={item.cate_name}
                    src={`/uploads/${item.Brand_logo}`}
                    fill
                    className="object-contain p-3"
                    priority
                  />
                </div>
              </Link>
              <p className="text-gray-700 font-medium text-center text-sm sm:text-base">
                {item.cate_name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarBrandsPage;
