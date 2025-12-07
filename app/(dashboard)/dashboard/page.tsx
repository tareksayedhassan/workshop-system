"use client";
export const dynamic = "force-dynamic";

import { useGetBrand } from "@/src/Hooks/ReactQuery/Beands/useGetBrand";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";
import Link from "next/link";
import { useTranslate } from "@/public/localization";
import { useSelectBrand } from "@/src/store/Brands/useSelectBrand";

const CarBrandsPage = () => {
  const t = useTranslate();

  const { data, isLoading } = useGetBrand();
  const brands = data?.data ?? [];
  const { setSelectBrand } = useSelectBrand();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t("Maintenance Schedule System")}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {t(
              "Select the car brand to view maintenance schedules, create a quotation, or display system reports."
            )}
          </p>
        </div>

        {/* Brands Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : brands.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            {t("No brands available right now.")}
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {brands.map((item: any) => (
              <Link
                key={item.id}
                href="/dashboard/MaintenanceDetails"
                className="group"
                onClick={() => setSelectBrand(item)}
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center justify-center gap-6 border border-gray-100 hover:border-gray-200 hover:scale-105">
                  <div className="relative w-32 h-32">
                    <Image
                      alt={item.cate_name}
                      src={`/uploads/${item.Brand_logo}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  <h3 className="text-gray-800 font-semibold text-xl text-center">
                    {t(item.cate_name)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarBrandsPage;
